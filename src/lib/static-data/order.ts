export interface Product {
  name: string;
}

export interface Order {
  ID: string;
  Date: string;
  Quantity: number;
  Products: Product[];
  Price: string;
  Status: 'Pending' | 'Completed' | 'Canceled';
}

export const orders: Order[] = [
  {
    ID: '019938',
    Date: '14 April, 2025',
    Quantity: 3,
    Products: [{ name: 'Iced Latte' }, { name: 'Donuts' }, { name: 'Croissant' }],
    Price: '$90.00',
    Status: 'Pending',
  },
  {
    ID: '820921',
    Date: '14 April, 2025',
    Quantity: 2,
    Products: [{ name: 'Iced Latte' }, { name: 'Croissant' }],
    Price: '$90.00',
    Status: 'Completed',
  },
  {
    ID: '728107',
    Date: '14 April, 2025',
    Quantity: 5,
    Products: [
      { name: 'Iced Latte' },
      { name: 'Donuts' },
      { name: 'Croissant' },
      { name: 'Coffee' },
      { name: 'Tea' },
    ],
    Price: '$90.00',
    Status: 'Canceled',
  },
  {
    ID: '738117',
    Date: '11 April, 2025',
    Quantity: 2,
    Products: [{ name: 'Iced Latte' }, { name: 'Donuts' }],
    Price: '$90.00',
    Status: 'Pending',
  },
  {
    ID: '904490',
    Date: '14 April, 2025',
    Quantity: 1,
    Products: [{ name: 'Iced Latte' }],
    Price: '$90.00',
    Status: 'Completed',
  },
  {
    ID: '567105',
    Date: '15 April, 2025',
    Quantity: 4,
    Products: [
      { name: 'Iced Latte' },
      { name: 'Donuts' },
      { name: 'Croissant' },
      { name: 'Sandwich' },
    ],
    Price: '$80.00',
    Status: 'Pending',
  },
];
