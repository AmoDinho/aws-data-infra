import { Stack, aws_athena as athena } from 'aws-cdk-lib';
import { Config, Function, StackContext } from 'sst/constructs';
import { CfnWorkGroup } from 'aws-cdk-lib/aws-athena';
import { Parameter } from 'sst/constructs/Parameter';
import { IWarehouseBucket } from '../storage';
import stackPrefixes from '../../stackPrefixes';
export interface IAthenaWorkGroup {
  workGroup: CfnWorkGroup;
  workGroupName: Parameter;
}

export const AthenaWorkGroup = (
  { stack }: StackContext,
  storage: IWarehouseBucket
): IAthenaWorkGroup => {
  const workGroup = new athena.CfnWorkGroup(
    stack,
    `${stackPrefixes.dataInfra}-athena-workgroup`,
    {
      name: `${stackPrefixes.dataInfra}-athen-workgroup`,
      workGroupConfiguration: {
        resultConfiguration: {
          outputLocation: `s3://${storage.WarehouseBucket.bucketName}/athena`,
        },
      },
    }
  );

  const workGroupName = new Config.Parameter(
    stack,
    `${stackPrefixes.dataInfra}-athena-wg-name`,
    {
      value: workGroup.name,
    }
  );

  stack.addDefaultFunctionBinding([workGroupName]);

  return {
    workGroup,
    workGroupName,
  };
};

const AthenaNotificationHandler = ({ stack }: StackContext): Function => {
  return new Function(stack, `${stackPrefixes.dataInfra}-queryprocess-athena`, {
    handler: `packages/warehouse/athena/index.handler`,
    permissions: ['athena:*', 's3:*', 'glue:*'],
  });
};

export interface IQueryProcessAthena {
  AthenaNotificationHandler: Function;
  AthenaWorkGroup: IAthenaWorkGroup;
}

export const QueryProcessAthena = (
  stackContext: StackContext,
  storage: IWarehouseBucket
): IQueryProcessAthena => {
  return {
    AthenaNotificationHandler: AthenaNotificationHandler(stackContext),
    AthenaWorkGroup: AthenaWorkGroup(stackContext, storage),
  };
};
