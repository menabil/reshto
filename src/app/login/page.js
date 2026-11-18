import { AuthExperience } from "@/components/auth/AuthExperience";

export const metadata = {
  title: "Sign In & Register",
  description: "Sign in to your Reshto account or access the Admin Management Portal.",
};

export default function LoginPage() {
  return <AuthExperience />;
}
