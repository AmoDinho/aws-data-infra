import { Bucket } from 'sst/node/bucket';
import { Config } from 'sst/node/config';
import { WarehouseBucket, DealershipsTableARN } from '../core/types';

const WAREHOUSE_BUCKET_NAME = (Bucket as WarehouseBucket)
  .dealership_warehouse_bucket.bucketName;
const DEALERSHIPS_TABLE_ARN = (Config as DealershipsTableARN)
  .dealerships_table_arn;

export { WAREHOUSE_BUCKET_NAME, DEALERSHIPS_TABLE_ARN };
