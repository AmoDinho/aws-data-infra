import { gql } from '@apollo/client';

export const GET_CARS = gql`
  {
    getCars {
      car_id
      condition
      created_at
      dealership_id
      dealership_lat
      dealership_lng
      dealership_name
      make
      milage
      model
      pk
      price
      sk
      sold_by
      title
      transmission
      updated_at
      user_id
      year
    }
  }
`;
