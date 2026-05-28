import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSteps } from "@/components/HowItWorksSteps";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { MemberStandards } from "@/components/MemberStandards";
import { PricingCards } from "@/components/PricingCards";
import { SafetyPrinciples } from "@/components/SafetyPrinciples";
import { TrustLayer } from "@/components/TrustLayer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustLayer />
      <HowItWorksSteps />
      <PricingCards />
      <MemberStandards />
      <SafetyPrinciples />
      <LegalDisclaimer />
    </>
  );
}
