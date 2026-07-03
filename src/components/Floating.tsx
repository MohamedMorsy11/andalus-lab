import { motion, useScroll } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import styles from './Floating.module.css';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className={styles.progressBar}
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/201005381032" 
      target="_blank" 
      rel="noreferrer"
      className={styles.floatingWhatsapp}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
};
