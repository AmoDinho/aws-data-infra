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
    },
    primaryIndex: { partitionKey: 'pk' },
    globalIndexes: {
      gsi_One: { partitionKey: 'sk' },
    },
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
