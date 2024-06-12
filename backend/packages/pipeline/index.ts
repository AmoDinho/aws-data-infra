import Dynamo from '../core/src/aws.dynamo.js';
import { IExportTableToPointInTimeInput } from '../core/types';
import crypto from 'crypto';
export const RunPipelineCron = async () => {
  // generate pipeline ID

  const randomPipelineID = crypto.randomUUID();
  const input: IExportTableToPointInTimeInput = {
    PipelineId: randomPipelineID,
    TableArn: '',
    S3Bucket: '',
    S3BucketOwner: '',
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
