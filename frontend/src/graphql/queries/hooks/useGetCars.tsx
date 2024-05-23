import { useQuery } from '@apollo/client';
import { GET_CARS } from '../schemas/getCars';
import { ICar } from '../../../types';
const useGetCars = (): Array<ICar> => {
  const [getCars, { loading, error, data }] = useQuery(GET_CARS);
};

export default useGetCars;
