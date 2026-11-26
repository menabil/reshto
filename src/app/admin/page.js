import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  title: "Admin Dashboard",
  description: "Reshto Restaurant Management Portal — orders, menu, bookings, and metrics.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
