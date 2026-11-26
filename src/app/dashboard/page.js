import { UserDashboard } from "@/components/dashboard/UserDashboard";

export const metadata = {
  title: "User Dashboard",
  description: "View your Reshto food orders and table bookings.",
};

export default function DashboardPage() {
  return <UserDashboard />;
}
