import { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Hero from '../components/sections/Hero';
import { ScrollProgress, FloatingWhatsApp } from '../components/Floating';

// Lazy loaded components for performance
const WhyUs = lazy(() => import('../components/sections/WhyUs'));
const Packages = lazy(() => import('../components/sections/Packages'));
const Doctor = lazy(() => import('../components/sections/Doctor'));
const Services = lazy(() => import('../components/sections/Services'));
const HomeVisit = lazy(() => import('../components/sections/HomeVisit'));
const Quiz = lazy(() => import('../components/sections/Quiz'));
const FAQ = lazy(() => import('../components/sections/FAQ'));
const Reviews = lazy(() => import('../components/sections/Reviews'));
const Contact = lazy(() => import('../components/sections/Contact'));
const Footer = lazy(() => import('../components/Footer'));

import Loader from '../components/ui/Loader';

const Home = () => {
  const { content, isLoading } = useAppContext();

  if (isLoading || !content) {
    return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Loader /></div>;
  }

  return (
    <>
      <Helmet>
        <html lang={content.lang === 'ar' ? 'ar' : 'en'} />
        <title>{content.hero.title} | {content.hero.subtitle}</title>
        <meta name="description" content={content.hero.description} />
        <meta property="og:title" content={`${content.hero.title} | ${content.hero.subtitle}`} />
        <meta property="og:description" content={content.hero.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/hero_bg.png" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Schema.org MedicalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": content.hero.title,
            "image": "https://placehold.co/600x400",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": content.contact.address,
              "addressLocality": "Tanta",
              "addressRegion": "Gharbia",
              "addressCountry": "EG"
            },
            "telephone": content.contact.phone,
            "openingHours": "Mo-Th 10:00-22:00, Sa-Su 10:00-22:00",
            "medicalSpecialty": "Pathology"
          })}
        </script>
      </Helmet>
      
      <ScrollProgress />
      <Navbar />
      
      <main>
        <Hero data={content.hero} />
        <Suspense fallback={<Loader />}>
          <WhyUs data={content.why_us} />
          <Packages data={content.packages} />
          <Doctor data={content.doctor} />
          <Services data={content.services} />
          <HomeVisit data={content.home_visit} />
          <Quiz data={content.quiz} />
          <FAQ data={content.faq} />
          <Reviews data={content.reviews} />
          <Contact data={content.contact} />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer data={content.footer} />
      </Suspense>
      <FloatingWhatsApp />
    </>
  );
};

export default Home;
