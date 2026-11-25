import { Suspense } from "react";
import { OrderExperience } from "@/components/order/OrderExperience";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata(
  "Order Now",
  "Browse the Reshto menu and build your order.",
  "/order",
);

async function OrderRouteContent({ searchParams }) {
  const params = await searchParams;
  const initialSearch = typeof params.search === "string" ? params.search : "";

  return <OrderExperience initialSearch={initialSearch} />;
}

export default function OrderPage({ searchParams }) {
  return (
    <Suspense fallback={<div className="order-loading" role="status">Loading the menu...</div>}>
      <OrderRouteContent searchParams={searchParams} />
    </Suspense>
  );
}
