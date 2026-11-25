import { UserDashboard } from "@/components/dashboard/UserDashboard";

export const metadata = {
  title: "User Dashboard",
  description: "View your Reshto food orders and table bookings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return <UserDashboard />;
}
