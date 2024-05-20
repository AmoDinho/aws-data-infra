import { TableResources, Table } from 'sst/node/table';
import { ICars } from '../types';
import Dynamo from '@my-sst-app/core/aws.dynamo';
interface DealershipTable extends TableResources {
  dealership_table: {
    tableName: string;
  };
}

const DEALERSHIP_TABLE = (Table as DealershipTable).dealership_table.tableName;
const getCars = async (): Promise<Array<ICars>> => {
  try {
    const params = {
      TableName: DEALERSHIP_TABLE,
      Limit: 100,
      ExclusiveStartKey: undefined,
    };
    const cars = await Dynamo.scanItemsV2(params);
    return cars.Items;
  } catch (error) {
    throw new Error(error);
  }
};
export default getCars;
