import { StackContext } from 'sst/constructs';
import { IWarehouseBucket, WarehouseBucket } from './storage';
import { IGlue, Glue } from './glue';
import { IQueryProcessAthena, QueryProcessAthena } from './athena';
export interface IWarehouse {
  Warehouse: IWarehouseBucket;
  Glue: IGlue;
  QueryProcessAthena: IQueryProcessAthena;
}
export const Warehouse = (stackContext: StackContext): IWarehouse => {
  const storage = WarehouseBucket(stackContext);
  const glue = Glue(stackContext, storage);
  const queryProcessAthena = QueryProcessAthena(stackContext, storage);
  return {
    Warehouse: storage,
    Glue: glue,
    QueryProcessAthena: queryProcessAthena,
  };
};
