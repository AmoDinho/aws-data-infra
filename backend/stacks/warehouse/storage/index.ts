import { Bucket, StackContext } from 'sst/constructs';
import { Construct } from 'constructs';

export interface IWarehouseBucket {
  WarehouseBucket: Bucket;
}

// export interface IWarehouseBucketResourcesS3 {
//   WarehouseBucket: IWarehouseBucket;
// }

export const WarehouseBucket = ({
  stack,
  app,
}: StackContext): IWarehouseBucket => {
  const WarehouseBucket = new Bucket(stack, `warehouse-bucket`);
  return {
    WarehouseBucket,
  };
};

// const WarehouseBucketResourcesS3 = (stack: Construct) => {
//   return {
//     WarehouseBucket: WarehouseBucket(stack),
//   };
// };

// export default WarehouseBucketResourcesS3;
