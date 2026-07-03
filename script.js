const content = {
  ar: {
    nav: {
      home: "الرئيسية",
      why_us: "لماذا نحن",
      packages: "الباقات",
      doctor: "طبيبتنا",
      services: "خدماتنا",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا"
    },
    hero: {
      title: "معمل الأندلس",
      subtitle: "للتحاليل الإكلينيكية والباثولوجية",
      description: "نقدم أدق النتائج وأفضل رعاية طبية بفضل فريقنا الطبي المتميز.",
      cta: "احجز الآن",
      cta_whatsapp: "تواصل عبر واتساب"
    },
    why_us: {
      title: "لماذا تختار الأندلس؟",
      features: [
        { title: "دقة متناهية", desc: "أحدث الأجهزة لضمان أدق النتائج." },
        { title: "سرعة الإنجاز", desc: "تسليم النتائج في أسرع وقت." },
        { title: "رعاية متميزة", desc: "فريق طبي متكامل يهتم بصحتك." }
      ]
    },
    packages: {
      title: "باقاتنا المميزة",
      list: [
        { name: "أبطال الأندلس", old_price: "850 ج.م", new_price: "499 ج.م", desc: "باقة التحاليل الشاملة" },
        { name: "البركة", old_price: "850 ج.م", new_price: "525 ج.م", desc: "لكبار السن ومرضى السكر" },
        { name: "ميزان الصحة", old_price: "1400 ج.م", new_price: "750 ج.م", desc: "فحص شامل لأجهزة الجسم" }
      ]
    },
    doctor: {
      title: "طبيبتنا المتميزة",
      name: "د/ ريم علي درويش",
      role: "استشاري تحاليل أنسجة وخلايا بمعهد الأورام طنطا",
      desc: "خبرة واسعة في مجال التحاليل الطبية والباثولوجية لضمان دقة التشخيص."
    },
    services: {
      title: "خدماتنا",
      list: [
        "تحاليل الدم",
        "تحاليل الهرمونات",
        "تحاليل الأنسجة والخلايا",
        "تحاليل الفيروسات",
        "دلالات الأورام",
        "الزيارة المنزلية"
      ]
    },
    contact: {
      title: "تواصل معنا",
      address: "سبرباي - برج العياري فوق مطعم كشري عدس - الدور الرابع",
      hours: "10 صباحاً - 10 مساءً (الجمعة مغلق)",
      phone: "01005381032"
    },
    footer: {
      text: "جميع الحقوق محفوظة © معمل الأندلس"
    }
  },
  en: {
    nav: {
      home: "Home",
      why_us: "Why Us",
      packages: "Packages",
      doctor: "Our Doctor",
      services: "Services",
      faq: "FAQ",
      contact: "Contact"
    },
    hero: {
      title: "Andalus Lab",
      subtitle: "For Clinical & Pathological Analysis",
      description: "We provide the most accurate results and best medical care.",
      cta: "Book Now",
      cta_whatsapp: "Contact via WhatsApp"
    },
    why_us: {
      title: "Why Choose Andalus?",
      features: [
        { title: "High Accuracy", desc: "Latest equipment ensuring the most accurate results." },
        { title: "Fast Results", desc: "Delivering results in the fastest time possible." },
        { title: "Premium Care", desc: "An integrated medical team caring for your health." }
      ]
    },
    packages: {
      title: "Our Premium Packages",
      list: [
        { name: "Andalus Heroes", old_price: "850 EGP", new_price: "499 EGP", desc: "Comprehensive tests package" },
        { name: "Al Baraka", old_price: "850 EGP", new_price: "525 EGP", desc: "For seniors and diabetic patients" },
        { name: "Health Balance", old_price: "1400 EGP", new_price: "750 EGP", desc: "Full body checkup" }
      ]
    },
    doctor: {
      title: "Our Distinguished Doctor",
      name: "Dr. Reem Ali Darwish",
      role: "Consultant of Tissue and Cell Analysis at Tanta Cancer Institute",
      desc: "Extensive experience in medical and pathological analysis ensuring accurate diagnosis."
    },
    services: {
      title: "Our Services",
      list: [
        "Blood Tests",
        "Hormone Tests",
        "Tissue & Cell Analysis",
        "Virus Tests",
        "Tumor Markers",
        "Home Visit"
      ]
    },
    contact: {
      title: "Contact Us",
      address: "Seberbay - Al Ayari Tower above Koshary Adas - 4th Floor",
      hours: "10 AM - 10 PM (Friday Closed)",
      phone: "01005381032"
    },
    footer: {
      text: "All rights reserved © Andalus Lab"
    }
  }
};

let currentLang = 'ar';
let currentTheme = 'light';

// Helper to access nested objects by string path
function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

// Translations logic
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.getElementById('lang-toggle').innerText = lang === 'ar' ? 'EN' : 'AR';
  
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = getNestedValue(content[lang], key);
    if (translation) {
      el.innerText = translation;
    }
  });
}

// Theme logic
function toggleTheme() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.className = currentTheme;
  document.getElementById('theme-toggle').innerText = currentTheme === 'light' ? '🌙' : '☀️';
}

// Mobile Menu
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}

// Setup intersection observer for animations
function setupAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
    observer.observe(el);
  });
}

// Event Listeners
document.getElementById('lang-toggle').addEventListener('click', () => {
  setLanguage(currentLang === 'ar' ? 'en' : 'ar');
});

document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
document.getElementById('mobile-menu-btn').addEventListener('click', toggleMobileMenu);

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('.nav-links').classList.remove('active');
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Initialize
setLanguage('ar');
setupAnimations();
