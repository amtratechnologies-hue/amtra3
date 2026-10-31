import CtaSection from '../../components/common/CtaSection';
import { usePageMeta } from '../../hooks/usePageMeta';
import HeroSection from './HeroSection';
import IntroSection from './IntroSection';
import ServicesSection from './ServicesSection';
import TechnologiesSection from './TechnologiesSection';
import WhyChooseUsSection from './WhyChooseUsSection';

export default function HomePage() {
  usePageMeta(
    'Software Development & IT Services',
    'AMTRA Technologies designs, builds, and supports dependable web, mobile, AI, cloud, and security solutions for modern organizations.',
  );

  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TechnologiesSection />
      <CtaSection />
    </>
  );
}
