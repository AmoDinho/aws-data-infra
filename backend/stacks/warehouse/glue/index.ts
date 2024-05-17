import { aws_glue as glue } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { StackContext, Config } from 'sst/constructs';
import { Parameter } from 'sst/constructs/Parameter';
import { IWarehouseBucket } from '../storage';
import stackPrefixes from '../../stackPrefixes';
import dealershipSchema from './schemas/dealerships';
import { cleanedDealershipSchema } from './schemas/cleanedDealership';
export interface IGlue {
  GlueRegistry: glue.CfnRegistry;
  GlueDatabase: glue.CfnDatabase;
  GlueDBName: Parameter;
}

export const Glue = (
  { stack, app }: StackContext,
  storage: IWarehouseBucket
): IGlue => {
  const dbName = `${stackPrefixes.dataInfra}-remix`;

  //warehouse db
  const glueDatabase = new glue.CfnDatabase(stack, `${dbName}`, {
    catalogId: stack.account,
    databaseInput: {
      name: dbName,
    },
  });

  // console.log('glueDatabase', glueDatabase);
  //warehouse db name parameter
  const glueDBName = new Config.Parameter(
    stack,
    `${stackPrefixes.dataInfra}-warehouse-dbname`,
    {
      value: dbName,
    }
  );

  //Bronze database table source names
  const warehousesStorageBucket = `s3://${storage.WarehouseBucket.bucketName}`;

  const preProcessedDynamoDBSource = {
    name: 'dealership',
    mainName: 'dealership',
    location: `${warehousesStorageBucket}/preprocessed/exports/dealerships/_latest/data/`,
    schema: dealershipSchema('newimage'),
    schemaVerisonNumber: 1,
  };

  const postProcessedDataSource = {
    tableConfig: {
      tableInput: {
        name: 'dealership',
        tableType: 'EXTERNAL_TABLE',
        storageDescriptor: {
          location: `${warehousesStorageBucket}/athena/cleaned/dealerships`,
          columns: cleanedDealershipSchema,
        },
      },
      openTableFormatInput: {
        icebergInput: {
          metadataOperation: 'CREATE',
          version: '2',
        },
      },
    },
  };

  //roles
  const glue_managed_policy = `arn:aws:iam::aws:policy/service-role/AWSGlueServiceRole`;
  const s3_managed_policy = `arn:aws:iam::aws:policy/AmazonS3FullAccess`;
  const glue_service_url = `glue.amazonaws.com`;
  new iam.Role(stack, `${stackPrefixes.dataInfra}-glue-role`, {
    roleName: `${stackPrefixes.dataInfra}-glue-role`,
    description: 'Datagods role needed for glue',
    managedPolicies: [
      iam.ManagedPolicy.fromManagedPolicyArn(
        stack,
        `${stackPrefixes.dataInfra}-glue-service-mangd-policy`,
        glue_managed_policy
      ),
      iam.ManagedPolicy.fromManagedPolicyArn(
        stack,
        `${stackPrefixes.dataInfra}-s3-service-mangd-policy`,
        s3_managed_policy
      ),
    ],
    assumedBy: new iam.ServicePrincipal(glue_service_url),
  });

  const glueRegistry = new glue.CfnRegistry(
    stack,
    `${stackPrefixes.dataInfra}-registry`,
    {
      description: `Registry for dealerships`,
      name: `${stackPrefixes.dataInfra}-registry`,
    }
  );

  const schemaProps = {
    compatibility: 'BACKWARD',
    dataFormat: 'JSON',
    name: preProcessedDynamoDBSource.name,
    schemaDefinition: JSON.stringify(preProcessedDynamoDBSource.schema),
    registry: {
      arn: glueRegistry.attrArn,
    },
    checkpointVersion: {
      versionNumber: preProcessedDynamoDBSource.schemaVerisonNumber,
    },
  };

  const cfnSchema = new glue.CfnSchema(
    stack,
    `${stackPrefixes.dataInfra}-schema-${preProcessedDynamoDBSource.name}`,
    schemaProps
  );

  //base table
  new glue.CfnTable(
    stack,
    `${stackPrefixes.dataInfra}-table-base-${preProcessedDynamoDBSource.name}`,
    {
      catalogId: `${stack.account}`,
      databaseName: `${dbName}`,
      tableInput: {
        name: preProcessedDynamoDBSource.name,
        storageDescriptor: {
          location: preProcessedDynamoDBSource.location,
          schemaReference: {
            schemaId: {
              registryName: glueRegistry.name,
              schemaName: cfnSchema.name,
            },
            schemaVersionNumber: preProcessedDynamoDBSource.schemaVerisonNumber,
          },
          inputFormat: 'org.apache.hadoop.mapred.TextInputFormat',
          outputFormat:
            'org.apache.hadoop.hive.ql.io.HiveIgnoreKeyTextOutputFormat',
          serdeInfo: {
            serializationLibrary: 'org.openx.data.jsonserde.JsonSerDe',
          },
        },
      },
    }
  ).addDependency(cfnSchema);

  //cleaned table :glue.CfnTable.OpenTableFormatInputProperty
  const openTableFormatInputProperty = {
    icebergInput: { metadataOperation: 'CREATE', version: '2' },
  };

  new glue.CfnTable(
    stack,
    `${stackPrefixes.dataInfra}-table-postprocessed-${postProcessedDataSource.tableConfig.tableInput.name}`,
    {
      catalogId: `${stack.account}`,
      databaseName: `${dbName}`,
      ...postProcessedDataSource.tableConfig,
    }
  );

  stack.addDefaultFunctionBinding([glueDBName]);

  return {
    GlueRegistry: glueRegistry,
    GlueDatabase: glueDatabase,
    GlueDBName: glueDBName,
  };
};
