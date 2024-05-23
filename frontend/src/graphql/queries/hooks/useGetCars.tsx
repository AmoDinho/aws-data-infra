import { useQuery } from '@apollo/client';
import { GET_CARS } from '../schemas/getCars';
import { IUseGetCarsResponse } from '../../../types';
const useGetCars = (): IUseGetCarsResponse => {
  const { loading, error, data } = useQuery(GET_CARS);

  return {
    loading,
    error,
    data,
  };
};

export default useGetCars;
