import { ApolloError } from '@apollo/client';

export interface ICar {
  pk: string;
  sk: string;
  car_id: string;
  model: string;
  title: string;
  make: string;
  condition: string;
  price: number;
  year: string;
  transmission: string;
  sold_by: string;
  user_id: string;
  dealership_id: string;
  dealership_name: string;
  dealership_lat: number;
  dealership_lng: number;
  created_at: string;
  updated_at: string;
  milage: number;
}

export interface IUseGetCarsResponse {
  loading: boolean;
  error: ApolloError | undefined;
  data: Array<ICar>;
}

export interface ICarCardProps {
  title: string;
  sold_by: string;
  dealership_name: string;
  milage: number;
  price: number;
}

export interface ICardLineItemProps {
  Icon?: React.FC | null;
  lineItem: string | number;
  additionalClassNames?: string;
}
