import { AuthExperience } from "@/components/auth/AuthExperience";

export const metadata = {
  title: "Register",
  description: "Create a Reshto account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RegisterPage() {
  return <AuthExperience initialMode="register" />;
}
