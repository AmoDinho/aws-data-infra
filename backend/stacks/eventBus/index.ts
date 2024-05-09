import { IWarehouse } from '../warehouse';
import { StackContext } from 'sst/constructs';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import stackPrefixes from '../stackPrefixes';
import { IPipeline } from '../warehouse/pipeline';
import { eventDetailTypes, eventSources } from '../../events';
const Bus = (
  { stack }: StackContext,
  {
    eventBusName,
    warehouse,
    pipeline,
  }: { eventBusName: string; warehouse: IWarehouse; pipeline: IPipeline }
) => {
  //event bus

  const eventBus = new events.EventBus(
    stack,
    `${stackPrefixes.dataInfra}-bus`,
    {
      eventBusName: eventBusName,
    }
  );

  new events.Rule(stack, `${stackPrefixes.dataInfra}-rule-pipeline-export`, {
    eventPattern: {
      source: [eventSources.warehouse_storage_object_put_handler],
      detailType: [eventDetailTypes.SourceDealershipFull],
    },
    ruleName: eventDetailTypes.SourceDealershipFull,
    description: eventDetailTypes.SourceDealershipFull,
    targets: [new targets.LambdaFunction(pipeline.PipelineEventHandler)],
    eventBus: eventBus,
  });

  return { eventBus };
};

export default Bus;
