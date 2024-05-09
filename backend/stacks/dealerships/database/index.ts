import { Table } from 'sst/constructs';
import { Construct } from 'constructs';

export interface IDealershipsTable {
  table: Table;
}

export interface IDealershipsResourcesDynamoDB {
  DealershipsTable: IDealershipsTable;
}

const DealershipsTable = (stack: Construct): IDealershipsTable => {
  const table = new Table(stack, `dealerships-table`, {
    fields: {
      pk: 'string',
      sk: 'string',
      car_id: 'string',
      model: 'string',
      title: 'string',
      make: 'string',
      condition: 'string',
      price: 'number',
      year: 'string',
      transmission: 'string',
      sold_by: 'string',
      user_id: 'string',
      dealership_id: 'string',
      dealership_name: 'string',
      dealership_lat: 'number',
      dealership_lng: 'number',
      created_at: 'string',
      updated_at: 'string',
      milage: 'number',
    },
    primaryIndex: { partitionKey: 'pk', sortKey: 'sk' },
    // pk - dealership_id#user_id
    // sk: dealership_name#created_at#make#model#year
    // globalIndexes: {
    //   gsi_One: { partitionKey: 'sk' },
    // },
  });

  return { table };
};

const DealershipsResoucesDynamoDB = (
  stack: Construct
): IDealershipsResourcesDynamoDB => {
  return {
    DealershipsTable: DealershipsTable(stack),
  };
};

export default DealershipsResoucesDynamoDB;
