import { Suspense } from "react";
import OrderTrackingExperience from "@/components/tracking/OrderTrackingExperience";

export const metadata = {
  title: { absolute: "Live Order Tracking | Biteon" },
  description:
    "Track your fresh meal in real-time from our kitchen to your doorstep with live GPS route and courier updates.",
};

export default function OrderTrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] dark:bg-[#0f0e0d]">
          <div className="flex flex-col items-center gap-3">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand border-t-transparent" />
            <p className="text-xs font-bold text-ink dark:text-white">Connecting to GPS dispatch...</p>
          </div>
        </div>
      }
    >
      <OrderTrackingExperience />
    </Suspense>
  );
}
