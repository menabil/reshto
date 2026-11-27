import { LoginExperience } from "@/components/auth/LoginExperience";

export const metadata = {
  title: { absolute: "Sign In | Biteon" },
  description: "Sign in to your Biteon account with your email and password.",
};

export default function LoginPage() {
  return <LoginExperience />;
}
