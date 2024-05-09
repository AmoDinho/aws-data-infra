import { StackContext } from 'sst/constructs';
import { Warehouse } from './warehouse';
import DealershipStack from './dealerships';

export function stack(stackContext: StackContext) {
  const warehouse = Warehouse(stackContext);
  const dealerShips = DealershipStack(stackContext);
}

export default stack;
