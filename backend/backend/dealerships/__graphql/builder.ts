import SchemaBuilder from '@pothos/core';
import { ICar } from '../types';
import getBoats from '../src/getBoats';
import getABoat from '../src/getABoat';
export const builder = new SchemaBuilder({});

const ICarGQL = builder.objectRef<ICar>('ICar');
ICarGQL.implement({
  fields: (t) => ({
    pk: t.exposeString('pk'),
    sk: t.exposeString('sk'),
    car_id: t.exposeString('car_id'),
    model: t.exposeString('model'),
    title: t.exposeString('title'),
    make: t.exposeString('make'),
    condition: t.exposeString('condition'),
    price: t.exporeFloat('price'),
    year: t.exposeString('year'),
    transmission: t.exposeString('transmission'),
    sold_by: t.exposeString('sold_by'),
    user_id: t.exposeString('user_id'),
    dealership_id: t.exposeString('dealership_id'),
    dealership_name: t.exposeString('dealership_name'),
    dealership_lat: t.exporeFloat('dealership_lat'),
    dealership_lng: t.exporeFloat('dealership_lng'),
    created_at: t.exposeString('created_at'),
    updated_at: t.exposeString('updated_at'),
    milage: t.exporeFloat('milage'),
  }),
});

builder.queryType({
  fields: (t) => ({
    getCars: t.field({
      description: 'Get cars',
      type: [ICarGQL],
      resolve: () => getBoats(),
    }),
    getABoat: t.field({
      description: 'Get A Baot ',
      type: [IBoatGQL],
      args: {
        boat_id: t.arg({
          type: 'String',
          description: 'Boat ID',
          required: true,
        }),
      },
      resolve: (root, args) => getABoat({ boat_id: args.boat_id }),
    }),
  }),
});
// builder.mutationType({});
