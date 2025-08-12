import { notFound } from "next/navigation";
import Link from "next/link";
import { leftArrow } from "@/assets/common-icons";
import GeneralCard from "@/components/order-details/GeneralCard";
import PaymentDetailsCard from "@/components/order-details/PaymentDetailsCard";
import Items from "@/components/order-details/Items";
import { getOrderById } from "@/lib/api/orders/order";

interface PageProps {
  params: {
    orderId: string;
  };
}

export default async function OrderDetailsPage({ params }: PageProps) {
  const orderId = params.orderId;

  const res = await getOrderById(orderId);

  if (!res.success || !res.order) {
    return notFound();
  }

  const order = res.order;

  const total = order.products.reduce((sum: number, product: any) => {
    return sum + (product.itemPrice || 0) * (product.itemQuantity || 1);
  }, 0);


  const gst = parseFloat((total * 0.05).toFixed(2));
  const subtotal = parseFloat((total + gst).toFixed(2));

  return (
    <div className="flex flex-col bg-white rounded-2xl min-h-screen mb-2">

      <div className="flex w-full justify-between p-5">
        <Link href={"/orders"}>
          <div className="flex items-center p-3 hover:text-primary cursor-pointer">
            {leftArrow}
            <h1 className="text-xl font-medium">Order Details</h1>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
        <GeneralCard
          date={new Date(order.createdAt).toISOString().split("T")[0]}
          id={order._id}
          name={order.customerName || order.user?.name || "Unknown"}
          contact={order.customerPhone || order.user?.phone || "N/A"}
          branch={order.products?.[0]?.item?.branch?.[0] || "N/A"}

        />

        <PaymentDetailsCard
          paymentMethod={{
            type: order.paymentMethod?.type || "unknown",
            lastFour: order.paymentMethod?.lastFour || "****",
          }}
          orderItems={order.products.map((p: any) => ({
            name: p.itemName || p.item?.name || "Unknown",
            price: `$${(p.itemPrice || 0).toFixed(2)}`,
            quantity: p.itemQuantity || 1,
          }))}
          subtotal={subtotal}
          gst={gst}
          total={total}
        />
      </div>

      <div className="flex flex-col m-6">
        <h1 className="text-lg font-medium mb-4">
          Item List ({order.products.length})
        </h1>
        <div className="flex flex-col gap-4">
          {order.products.map((item: any, index: number) => {
            const modifiersList =
              item.modifiers?.map((mod: any) => mod.modifier || "No modifier") || [];

            return (
              <Items
                key={index}
                imageSrc={item.item?.images?.[0] || "/iced-mocha.png"}
                altText={`Item ${index + 1}`}
                heading={item.item?.name || "Unknown"}
                total={(item.itemPrice * (item.itemQuantity || 1)).toFixed(2)}
                Qty={item.itemQuantity || 1}
                Modifiers={modifiersList}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
