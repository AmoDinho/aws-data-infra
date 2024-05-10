const dealershipSchema = (baseKey: string) => {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'Generated schema for Root',
    type: 'object',
    properties: {
      [baseKey]: {
        type: 'object',
        properties: {
          pk: {
            S: '',
          },
          sk: {
            S: '',
          },
          car_id: {
            S: 'string',
          },
          model: {
            S: 'string',
          },
          title: {
            S: 'string',
          },
          make: {
            S: 'string',
          },
          condition: {
            S: 'string',
          },
          price: {
            N: '9909.22',
          },
          year: {
            S: 'string',
          },
          transmission: {
            S: 'string',
          },
          sold_by: {
            S: 'string',
          },
          user_id: {
            S: 'string',
          },
          dealership_id: {
            S: 'string',
          },
          dealership_name: {
            S: 'string',
          },
          dealership_lat: {
            N: '23.9883',
          },
          dealership_lng: {
            N: '093.333',
          },
          created_at: {
            S: 'string',
          },
          updated_at: {
            S: 'string',
          },
          milage: {
            N: '23443.33',
          },
          seller_info: {
            M: {
              name: {
                S: 'String',
              },
              surname: {
                S: 'String',
              },
              number: {
                N: '7889809',
              },
            },
          },
        },
      },
    },
  };
};
export default dealershipSchema;
