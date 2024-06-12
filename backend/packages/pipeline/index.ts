import {
  DEALERSHIPS_TABLE_ARN,
  WAREHOUSE_BUCKET_NAME,
} from '../__stackConstants/index.js';
import Dynamo from '../core/src/aws.dynamo.ts';
import { IExportTableToPointInTimeInput } from '../core/types';
import crypto from 'crypto';
export const RunPipelineCron = async () => {
  // generate pipeline ID

  console.log('xxx');
  const randomPipelineID = crypto.randomUUID();
  const input: IExportTableToPointInTimeInput = {
    PipelineId: randomPipelineID,
    TableArn: DEALERSHIPS_TABLE_ARN,
    S3Bucket: WAREHOUSE_BUCKET_NAME,
    S3Prefix: `/preprocessed/exports/dealerships/_latest/data/`,
  };
  try {
    const respone = await Dynamo.ExportTableToPointInTime(input);
    console.log('response', respone);
    return respone;
  } catch (e) {
    return e;
  }
};

export const PipelineEventHandler = () => {};
