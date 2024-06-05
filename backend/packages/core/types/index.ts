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
  S3BucketOwner: string;
  S3Prefix: string;
  IncrementalExportSpecification?: {
    ExportFromTime: Date;
    ExportToTime: Date;
  };
}
