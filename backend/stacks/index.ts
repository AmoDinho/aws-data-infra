import { StackContext, Config } from 'sst/constructs';
import { Warehouse } from './warehouse';
import stackPrefixes from './stackPrefixes';
import Bus from './eventBus';
export function stack(stackContext: StackContext) {
  const eventBusName = `${stackPrefixes.dataInfra}-bus-${stackContext.app.stage}`;
  const eventBusNameParameter = new Config.Parameter(
    stackContext.stack,
    `${stackPrefixes.dataInfra}-eventsBusName`,
    {
      value: eventBusName,
    }
  );

  stackContext.stack.addDefaultFunctionBinding([eventBusNameParameter]);
  const warehouse = Warehouse(stackContext);
  Bus(stackContext, {
    eventBusName: eventBusName,
    warehouse: warehouse,
  });
}

export default stack;
