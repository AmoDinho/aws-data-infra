import { ICarCardProps } from '../../types';
import { Card, CardHeader, CardContent } from './card';
export const CarCard = ({
  title,
  sold_by,
  dealership_name,
  milage,
  price,
}: ICarCardProps) => {
  return (
    <Card>
      <CardHeader>
        <img src="../assets/placeholder.svg" />
      </CardHeader>
      <CardContent>
        <div className="p-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-500">{price}</p>
          <p className="text-gray-500">{sold_by}</p>
          <p className="text-2xl font-bold">{dealership_name}</p>
          <p className="text-gray-500">{milage}</p>
        </div>
      </CardContent>
    </Card>
  );
};
