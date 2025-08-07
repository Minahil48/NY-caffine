import { orders } from '@/app/data/order';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { leftArrow } from '@/assets/common-icons';
import Sidebar from '@/Components/Sidebar';
import Header from '@/Components/Header';
import GeneralCard from '@/Components/OrderDetails/GeneralCard';
import PaymentDetailsCard from '@/Components/OrderDetails/PaymentDetailsCard';
import Items from '@/Components/OrderDetails/Items';

interface PageProps {
  params: {
    orderId: string;
  };
}

export default function OrderDetailsPage({ params }: PageProps) {
  const order = orders.find(o => o.ID === params.orderId);
  if (!order) return notFound();

  const priceValue = parseFloat(order.Price.replace(/[^0-9.-]+/g, ''));

  const subtotal = priceValue * order.Quantity;

  const gst = parseFloat((subtotal * 0.05).toFixed(2));

  const total = parseFloat((subtotal + gst).toFixed(2));

  return (
    <div className='bg-gray-100 grid grid-cols-1 lg:grid-cols-[230px_1fr] ml-2'>
      <div><Sidebar /></div>
      <div className='flex flex-col gap-3 justify-center'>
        <Header heading='Orders' subheading='Track all your orders from here' />

        <div className='flex flex-col bg-white rounded-2xl min-h-screen mb-2'>
          <div className='flex w-full justify-between p-5'>
            <Link href={"/orders"}>
              <div className='flex items-center p-3 hover:text-primary'>
                {leftArrow}
                <h1 className='text-xl font-medium'>Order Details</h1>
              </div>
            </Link>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-[1fr_1fr]'>
            <GeneralCard
              date={order.Date}
              id={order.ID}
              name="Aiza Nadeem"
              contact="+99 345 8789199"
              branch="Ny Caffine California"
            />

            <PaymentDetailsCard
              paymentMethod={{ type: 'card', lastFour: '456' }}
              orderItems={order.Products.map(p => ({
                name: p.name,
                price: `$${priceValue.toFixed(2)}`,
                quantity: 1,
              }))}
              subtotal={subtotal}
              gst={gst}
              total={total}
            />

          </div>

          <div className='flex flex-col m-6'>
            <h1 className='text-lg font-medium mb-4'>Item List ({order.Products.length})</h1>
            <div className='flex flex-col gap-4'>
              {order.Products.map((item, index) => (
                <Items
                  key={index}
                  imageSrc="/iced-mocha.png"
                  altText={`Item ${index + 1}`}
                  heading={item.name}
                  total={priceValue.toFixed(2)}
                  Qty={1}
                  Modifiers={['Sprinkles', 'Almond Milk']}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
