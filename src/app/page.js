import { HomeLanding } from "@/components/home/HomeLanding";

export const metadata = {
  title: { absolute: "Fresh Dining & Online Ordering | Biteon" },
  description:
    "Discover Biteon's fresh menu, reserve a table, and order your favorite meals for pickup or delivery.",
};

export default function HomePage() {
  return <HomeLanding />;
}
