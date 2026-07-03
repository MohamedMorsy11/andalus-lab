import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import type { HeroContent } from '../../types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const Hero = ({ data }: { data: HeroContent }) => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.overlay}></div>
      <motion.div 
        className={`container ${styles.content}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants}>
          {data.title}
        </motion.h1>
        <motion.h2 variants={itemVariants}>
          {data.subtitle}
        </motion.h2>
        <motion.p variants={itemVariants}>
          {data.description}
        </motion.p>
        
        <motion.div 
          className={styles.actions}
          variants={itemVariants}
        >
          <a href="#packages" className="btn-primary">{data.cta}</a>
          <a href="https://wa.me/201005381032" target="_blank" rel="noreferrer" className={styles.btnWhatsapp}>
            {data.cta_whatsapp}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
