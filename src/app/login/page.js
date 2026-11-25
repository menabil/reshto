import { LoginExperience } from "@/components/auth/LoginExperience";

export const metadata = {
  title: "Sign In",
  description: "Sign in to your Reshto account with your email and password.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginExperience />;
}
