import { Suspense } from "react";
import OrderTrackingExperience from "@/components/tracking/OrderTrackingExperience";

export const metadata = {
  title: { absolute: "Track Your Order | Biteon" },
  description:
    "Track your food delivery in real-time with live updates and courier GPS status.",
};

export default function TrackOrderPage() {
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
