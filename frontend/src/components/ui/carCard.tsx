import { ICarCardProps, ICardLineItemProps } from '../../types';
import { Card, CardHeader, CardContent } from './card';
import placeholder from '@/assets/placeholder.svg';
import { Money, Building, Clock, User } from '../icons';

const CardLineItem = ({
  Icon,
  lineItem,
  additionalClassNames,
}: ICardLineItemProps) => (
  <div className="flex flex-row mb-2">
    {Icon ? <Icon /> : <></>}
    <p className={`text-gray-500 ${additionalClassNames}`}>{lineItem}</p>
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
      Icon: null,
      lineItem: title,
      additionalClassNames: 'text-lg font-bold ',
    },

    {
      Icon: User,
      lineItem: sold_by,
      additionalClassNames: 'text-gray-500',
    },
    {
      Icon: Money,
      lineItem: `ZAR ${price}`,
      additionalClassNames: 'text-2xl font-bold',
    },
    {
      Icon: Building,
      lineItem: dealership_name,
    },
    {
      Icon: Clock,
      lineItem: `${milage} Kms`,
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
              additionalClassNames={item?.additionalClassNames}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
