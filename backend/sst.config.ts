import { SSTConfig } from 'sst';
import ServiceOneStack from './stacks/serviceOne';
export default {
  config(_input) {
    return {
      name: 'serverless-apollo',
      region: 'eu-west-1',
    };
  },
  stacks(app) {
    app.stack(ServiceOneStack);
  },
} satisfies SSTConfig;
