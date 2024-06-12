import { BucketResources } from 'sst/node/bucket';
import { ConfigTypes } from 'sst/node/config';

export type ScalarType<T = void> =
  | string
  | number
  | boolean
  | Record<string, T>;
export type RecordScalar<T = void> = Record<string, ScalarType<T>>;

export interface ISignedURLParam {
  Bucket?: string;
  Key: string;
  ACL?: 'public-read';
  ContentType?: 'application/json' | 'application/pdf';
  Expires: number;
}

export interface IExportTableToPointInTimeInput {
  PipelineId?: string;
  TableArn: string;
  S3Bucket: string;
  S3Prefix: string;
  IncrementalExportSpecification?: {
    ExportFromTime: Date;
    ExportToTime: Date;
  };
}

export interface WarehouseBucket extends BucketResources {
  dealership_warehouse_bucket: {
    bucketName: string;
  };
}

export interface DealershipsTableARN extends ConfigTypes {
  dealerships_table_arn: string;
}
