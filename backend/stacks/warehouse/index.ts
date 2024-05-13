import { StackContext } from 'sst/constructs';
import { IWarehouseBucket, WarehouseBucket } from './storage';
import { IGlue, Glue } from './glue';
export interface IWarehouse {
  Warehouse: IWarehouseBucket;
  Glue: IGlue;
}
export const Warehouse = (stackContext: StackContext): IWarehouse => {
  const storage = WarehouseBucket(stackContext);
  const glue = Glue(stackContext, storage);
  return {
    Warehouse: storage,
    Glue: glue,
  };
};
