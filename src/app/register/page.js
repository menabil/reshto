import { RegistrationExperience } from "@/components/auth/RegistrationExperience";

export const metadata = {
  title: { absolute: "Register | Biteon" },
  description: "Create a Biteon account to manage your orders and reservations.",
};

export default function RegisterPage() {
  return <RegistrationExperience />;
}
