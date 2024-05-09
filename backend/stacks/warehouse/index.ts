import { StackContext } from 'sst/constructs';
import { IWarehouseBucket, WarehouseBucket } from './storage';

export interface IWarehouse {
  Warehouse: IWarehouseBucket;
}
export const Warehouse = (stackContext: StackContext): IWarehouse => {
  const storage = WarehouseBucket(stackContext);

  return {
    Warehouse: storage,
  };
};
