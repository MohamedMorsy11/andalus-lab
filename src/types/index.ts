export interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  cta_whatsapp: string;
}

export interface Feature {
  id: string;
  title: string;
  desc: string;
}

export interface WhyUsContent {
  title: string;
  features: Feature[];
}

export interface Package {
  id: string;
  name: string;
  desc: string;
  old_price: number;
  new_price: number;
  currency: string;
  features: string[];
}

export interface PackagesContent {
  title: string;
  subtitle: string;
  list: Package[];
}

export interface DoctorContent {
  title: string;
  name: string;
  role: string;
  desc: string;
  stats: {
    exp: string;
    patients: string;
    rating: string;
  };
}

export interface ServicesContent {
  title: string;
  list: string[];
}

export interface HomeVisitContent {
  title: string;
  desc: string;
  cta: string;
}

export interface QuizContent {
  title: string;
  questions: {
    q: string;
    options: string[];
  }[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQContent {
  title: string;
  list: FAQItem[];
}

export interface Review {
  name: string;
  text: string;
}

export interface ReviewsContent {
  title: string;
  list: Review[];
}

export interface ContactContent {
  title: string;
  phone: string;
  address: string;
  whatsapp: string;
  whatsapp_msg: string;
  map_url: string;
  hours: string;
}

export interface FooterContent {
  text: string;
}

export interface NavContent {
  home: string;
  why_us: string;
  packages: string;
  services: string;
  contact: string;
}

export interface SiteContent {
  lang: string;
  nav: NavContent;
  hero: HeroContent;
  why_us: WhyUsContent;
  packages: PackagesContent;
  doctor: DoctorContent;
  services: ServicesContent;
  home_visit: HomeVisitContent;
  quiz: QuizContent;
  faq: FAQContent;
  reviews: ReviewsContent;
  contact: ContactContent;
  footer: FooterContent;
}
