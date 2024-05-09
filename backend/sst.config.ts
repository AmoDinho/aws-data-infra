import { SSTConfig } from 'sst';
import DealershipsStack from './stacks/dealerships';
export default {
  config(_input) {
    return {
      name: 'aws-data-infra',
      region: 'eu-west-1',
    };
  },
  stacks(app) {
    app.stack(DealershipsStack);
  },
} satisfies SSTConfig;
