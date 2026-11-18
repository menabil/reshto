import { UserDashboard } from "@/components/dashboard/UserDashboard";

export const metadata = {
  title: "User Dashboard",
  description: "View your Reshto food orders, table bookings, and saved favorites.",
};

export default function DashboardPage() {
  return <UserDashboard />;
}
