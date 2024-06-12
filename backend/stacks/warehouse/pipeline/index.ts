import { Cron, Function, StackContext } from 'sst/constructs';
import stackPrefixes from '../../stackPrefixes';
import { IWarehouseBucket } from '../storage';

export interface IPipeline {
  PipelineEventHandler: Function;
  RunPipelineCron: Cron;
}

// this will trigger athena to update the tables with new export data
export const PipelineEventHandler = ({ stack }: StackContext): Function => {
  return new Function(stack, `${stackPrefixes.dataInfra}-pipe-event-handler`, {
    handler: 'packages/warehouse/pipeline/index.PipelineEventHandler',
    permissions: [
      'sts:AssumeRole',
      'events:PutEvents',
      'athena:*',
      's3:*',
      'glue:*',
    ],
  });
};

//this will tell dynamo to export the data to an s3 bucket
const RunPipelineCron = (
  { stack }: StackContext,
  storage: IWarehouseBucket
): Cron => {
  const cron = new Cron(stack, `${stackPrefixes.dataInfra}-pipeline-cron`, {
    schedule: 'rate(1 minute)',
    job: 'packages/pipeline/index.RunPipelineCron',
  });
  cron.bind([storage.WarehouseBucket]);
  cron.attachPermissions([
    'sts:AssumeRole',
    'events:PutEvents',
    'athena:*',
    's3:*',
    'glue:*',
  ]);
  return cron;
};

export const Pipeline = (stackContext: StackContext, storage): IPipeline => {
  return {
    RunPipelineCron: RunPipelineCron(stackContext, storage),
    PipelineEventHandler: PipelineEventHandler(stackContext),
  };
};
