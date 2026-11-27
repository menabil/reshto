import { CheckoutExperience } from "@/components/checkout/CheckoutExperience";

export const metadata = {
  title: { absolute: "Checkout & Order Confirmation | Biteon" },
  description:
    "Complete your food order from Biteon restaurant. Select delivery or pickup, enter shipping details, apply discount coupons, and pay online or via Cash on Delivery.",
};

export default function CheckoutPage() {
  return <CheckoutExperience />;
}
