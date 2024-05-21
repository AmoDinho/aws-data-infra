import { SSTConfig } from 'sst';
import DealershipsStack from './stacks/dealerships';
import stackPrefixes from './stacks/stackPrefixes';
import { Stack } from 'aws-cdk-lib';
import stack from './stacks';
export default {
  config(_input) {
    return {
      name: 'aws-data-infra',
      region: 'eu-west-1',
    };
  },
  stacks(app) {
    app.stack(DealershipsStack, {
      id: `${stackPrefixes.dataInfra}-dealership`,
    });
    // app.stack(stack, { id: `${stackPrefixes.dataInfra}-warehouse-infra` });
  },
} satisfies SSTConfig;
