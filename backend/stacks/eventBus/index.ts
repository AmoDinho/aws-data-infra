import { IWarehouse } from '../warehouse';
import { StackContext } from 'sst/constructs';
import * as events from 'aws-cdk-lib/aws-events';
import stackPrefixes from '../stackPrefixes';
const Bus = (
  { stack }: StackContext,
  { eventBusName, warehouse }: { eventBusName: string; warehouse: IWarehouse }
) => {
  //event bus

  const eventBus = new events.EventBus(
    stack,
    `${stackPrefixes.dataInfra}-bus`,
    {
      eventBusName: eventBusName,
    }
  );

  return { eventBus };
};
