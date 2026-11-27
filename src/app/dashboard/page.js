import { UserDashboard } from "@/components/dashboard/UserDashboard";

export const metadata = {
  title: { absolute: "User Dashboard | Biteon" },
  description: "View your Biteon food orders and table bookings.",
};

export default function DashboardPage() {
  return <UserDashboard />;
}
