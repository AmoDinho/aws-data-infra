import { Cron, Function, StackContext } from 'sst/constructs';
import stackPrefixes from '../../stackPrefixes';
export interface IPipeline {
  PipelineEventHandler: Function;
  RunPipelineCron: Cron;
}

export const PipelineEventHandler = ({ stack }: StackContext): Function => {
  return new Function(stack, `${stackPrefixes.dataInfra}-pipe-event-handler`, {
    handler: 'backend/warehouse/pipeline/index.PipelineEventHandler',
    permissions: [
      'sts:AssumeRole',
      'events:PutEvents',
      'athena:*',
      's3:*',
      'glue:*',
    ],
  });
};

export const RunPipelineCron = ({ stack }: StackContext): Function => {
  return new Function(stack, `${stackPrefixes.dataInfra}-pipeline-cron`, {
    handler: 'backend/warehouse/pipeline/index.PipelineCron',
    permissions: [
      'sts:AssumeRole',
      'events:PutEvents',
      'athena:*',
      's3:*',
      'glue:*',
    ],
  });
};
