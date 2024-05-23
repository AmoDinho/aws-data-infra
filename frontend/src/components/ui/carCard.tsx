import { ICarCardProps } from '../../types';
import { Card, CardHeader, CardContent } from './card';
import placeholder from '@/assets/placeholder.svg';
import { Money } from '../icons';

const CardLineItem = ({ Icon, lineItem }) => (
  <div className="flex flex-row">
    <Icon />
    <p className="text-gray-500">{lineItem}</p>
  </div>
);
export const CarCard = ({
  title,
  sold_by,
  dealership_name,
  milage,
  price,
}: ICarCardProps) => {
  const lineItems = [
    {
      Icon: Money,
      lineItem: title,
    },
    {
      Icon: Money,
      lineItem: price,
    },
    {
      Icon: Money,
      lineItem: sold_by,
    },
    {
      Icon: Money,
      lineItem: dealership_name,
    },
    {
      Icon: Money,
      lineItem: milage,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <img src={placeholder} />
      </CardHeader>
      <CardContent>
        <div className="p-4">
          {lineItems.map((item, itemIdx) => (
            <CardLineItem
              Icon={item.Icon}
              key={itemIdx}
              lineItem={item.lineItem}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
