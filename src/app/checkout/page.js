import { CheckoutExperience } from "@/components/checkout/CheckoutExperience";

export const metadata = {
  title: "Checkout & Order Confirmation",
  description:
    "Complete your food order from Reshto restaurant. Select delivery or pickup, enter shipping details, apply discount coupons, and pay online or via Cash on Delivery.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return <CheckoutExperience />;
}
