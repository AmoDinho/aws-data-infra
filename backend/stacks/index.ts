import { StackContext, Config } from 'sst/constructs';
import { Warehouse } from './warehouse';
import stackPrefixes from './stackPrefixes';
import Bus from './eventBus';
import { Pipeline } from './warehouse/pipeline';
export function stack(stackContext: StackContext) {
  const warehouse = Warehouse(stackContext);
  const pipeline = Pipeline(stackContext, warehouse);
  /// Bind the finctions that will write to s3 & glue tables

  const eventBusName = `${stackPrefixes.dataInfra}-bus-${stackContext.app.stage}`;
  const eventBusNameParameter = new Config.Parameter(
    stackContext.stack,
    `${stackPrefixes.dataInfra}-eventsBusName`,
    {
      value: eventBusName,
    }
  );
  stackContext.stack.addDefaultFunctionBinding([eventBusNameParameter]);

  warehouse.Warehouse.WarehouseBucket.bind([pipeline.RunPipelineCron]);
  pipeline.RunPipelineCron.bind([
    warehouse.Warehouse.WarehouseBucket,
    warehouse.Glue.GlueDBName,
  ]);
  pipeline.PipelineEventHandler.bind([
    warehouse.Warehouse.WarehouseBucket,
    warehouse.Glue.GlueDBName,
  ]);
  Bus(stackContext, {
    eventBusName: eventBusName,
    warehouse: warehouse,
    pipeline: pipeline,
  });
}

export default stack;
