// app/data/menu.ts

export interface Product {
  name: string;
}

export interface Order {
  Name: string;
  Price: string;
  Category: string;
  Modifiers: Product[];
  Qty: number;
  status: 'Active' | 'Inactive';
}

export const initialMenuOrders: Order[] = [
  {
    Name: 'Latte',
    Price: '$90.00',
    Category: 'Iced Coffee',
    Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
    Qty: 23,
    status: 'Active',
  },
  {
    Name: 'Mocha',
    Price: '$90.00',
    Category: 'Iced Coffee',
    Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
    Qty: 43,
    status: 'Active',
  },
  {
    Name: 'Hot Chocolate',
    Price: '$90.00',
    Category: 'Milkshake',
    Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
    Qty: 19,
    status: 'Active',
  },

  {
    Name: 'Mocha',
    Price: '$90.00',
    Category: 'Iced Coffee',
    Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
    Qty: 43,
    status: 'Active',
  },
  {
    Name: 'Mocha',
    Price: '$90.00',
    Category: 'Iced Coffee',
    Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
    Qty: 10,
    status: 'Inactive',
  },
  {
    Name: 'Hot Chocalate',
    Price: '$90.00',
    Category: 'Milkshake',
    Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
    Qty: 19,
    status: 'Active',
  },
  {
    Name: 'Americano',
    Price: '$90.00',
    Category: 'Milkshake',
    Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
    Qty: 4,
    status: 'Inactive',
  },
  {
    Name: 'Espresso',
    Price: '$90.00',
    Category: 'Milkshake',
    Modifiers: [{ name: 'Dairy' }, { name: 'Decaf' }, { name: 'Non-Diary' }],
    Qty: 8,
    status: 'Active',
  },
];
