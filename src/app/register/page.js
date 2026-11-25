import { RegistrationExperience } from "@/components/auth/RegistrationExperience";

export const metadata = {
  title: "Register",
  description: "Create a Reshto account to manage your orders and reservations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return <RegistrationExperience />;
}
