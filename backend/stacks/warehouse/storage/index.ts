import { Bucket } from 'sst/constructs';
import { Construct } from 'constructs';

export interface IWarehouseBucket {
  warehouseBucket: Bucket;
}

export interface IWarehouseBucketResourcesS3 {
  WarehouseBucket: IWarehouseBucket;
}

const WarehouseBucket = (stack: Construct): IWarehouseBucket => {
  const warehouseBucket = new Bucket(stack, `warehouse-bucket`);
  return {
    warehouseBucket,
  };
};

const WarehouseBucketResourcesS3 = (stack: Construct) => {
  return {
    WarehouseBucket: WarehouseBucket(stack),
  };
};

export default WarehouseBucketResourcesS3;
