import { AuthExperience } from "@/components/auth/AuthExperience";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Reshto account.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <AuthExperience />;
}
