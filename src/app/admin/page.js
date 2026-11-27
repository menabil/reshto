import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata = {
  title: { absolute: "Admin Dashboard | Biteon" },
  description: "Biteon Restaurant Management Portal — orders, menu, bookings, and metrics.",
};

export default function AdminPage() {
  return <AdminDashboard />;
}
