import OrderSection from "@/components/order/OrderSection";
import { getAllOrders } from "@/lib/api/orders/order";

async function OrdersPage() {
  const res = await getAllOrders();
  const rawOrders = res.success ? res.orders : [];

  const orders = rawOrders.map((order: any) => ({
    ID: order._id || "",
    Date: new Date(order.createdAt).toISOString().split("T")[0],
    Quantity: order.itemsQuantity || 0,
    Products:
      order.products?.map((p: any) => p.item?.name).join(", ") || "",
    Price: order.totalPrice?.toString() || "0",
    Status: order.pickupStatus || "pending",
  }));

  return <OrderSection ordersList={orders} />;
}

export default OrdersPage;
