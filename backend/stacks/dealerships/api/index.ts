import { Api } from 'sst/constructs';
import { Construct } from 'constructs';
export interface IDealershipsIResource {
  DealershipsAPI: Api;
}

const DealershipsAPI = (Stack: Construct): Api => {
  const DealershipsAPI = new Api(Stack, `dealerships-stack-api`, {
    routes: {
      'POST /dealerships-graphql': {
        type: 'graphql',
        function: 'packages/dealerships/__graphql/index.handler',
      },
      // pothos: {
      //   schema: 'packages/ServiceOne/__graphql/schema.ts',
      //   output: 'packages/ServiceOne/__graphql/schema.graphql',
      //   commands: [
      //     'cd packages/ServiceOne/__graphql && npx @genql/cli --output ./genql --schema ./schema.graphql --esm',
      //   ],
      // },
    },
    defaults: {
      function: {
        timeout: 40,
      },
    },
  });

  DealershipsAPI.attachPermissions(['dynamodb:*']);

  return DealershipsAPI;
};

const DealershipsResourcesAPI = (stack: Construct): IDealershipsIResource => {
  return {
    DealershipsAPI: DealershipsAPI(stack),
  };
};

export default DealershipsResourcesAPI;
