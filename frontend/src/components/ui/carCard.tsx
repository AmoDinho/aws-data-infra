import { ICarCardProps } from '../../types';
import { Card, CardHeader, CardContent } from './card';
import placeholder from '@/assets/placeholder.svg';
import { Money, Building, Clock, User } from '../icons';

const CardLineItem = ({ Icon, lineItem }) => (
  <div className="flex flex-row">
    {Icon ? <Icon /> : <></>}
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
      Icon: '',
      lineItem: title,
    },
    {
      Icon: Money,
      lineItem: price,
    },
    {
      Icon: User,
      lineItem: sold_by,
    },
    {
      Icon: Building,
      lineItem: dealership_name,
    },
    {
      Icon: Clock,
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
