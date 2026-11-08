import CtaSection from '../../components/common/CtaSection';
import { usePageMeta } from '../../hooks/usePageMeta';
import FounderPreviewSection from './FounderPreviewSection';
import HeroSection from './HeroSection';
import IntroSection from './IntroSection';
import ProcessPreviewSection from './ProcessPreviewSection';
import RemoteWorkingPreviewSection from './RemoteWorkingPreviewSection';
import ServicesSection from './ServicesSection';
import WhyChooseUsSection from './WhyChooseUsSection';

export default function HomePage() {
  usePageMeta(
    'Software Development & IT Solutions',
    'AMTRA Technologies delivers custom software, web, mobile, and desktop applications, payment applications, AI solutions, cybersecurity, cloud services, and IT consulting.',
  );

  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProcessPreviewSection />
      <RemoteWorkingPreviewSection />
      <FounderPreviewSection />
      <CtaSection
        title="Have an Idea? Let's Build It Together."
        description="Tell us about your project, and let's explore how AMTRA Technologies can help bring your vision to life."
        primaryLabel="Request a Service"
        primaryTo="/contact#inquiry"
        secondaryLabel="Explore Our Services"
        secondaryTo="/services"
      />
    </>
  );
}
