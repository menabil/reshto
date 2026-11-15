import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "About Us",
  description: "Learn more about Reshto, our team and mission.",
};

export default function AboutPage() {
  return (
    <div className="py-16 md:py-24">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">About Us</h1>
        <p className="mt-6 text-lg leading-8 text-ink-700/70">
          At Reshto, we believe dining is not just about food but also about creating moments. Our
          restaurant provides a cozy, welcoming ambiance that enhances your dining experience,
          making every meal special.
        </p>
      </Container>
    </div>
  );
}
