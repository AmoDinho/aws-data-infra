import { SSTConfig } from 'sst';
import ServiceOneStack from './stacks/serviceOne';
export default {
  config(_input) {
    return {
      name: 'aws-data-infra',
      region: 'eu-west-1',
    };
  },
  stacks(app) {
    app.stack(ServiceOneStack);
  },
} satisfies SSTConfig;
