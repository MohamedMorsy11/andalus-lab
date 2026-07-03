import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import styles from './Services.module.css';
import type { ServicesContent } from '../../types';

const Services = ({ data }: { data: ServicesContent }) => {
  return (
    <section id="services" className={styles.services}>
      <div className={`container ${styles.container}`}>
        <div className={styles.leftCol}>
          <div className={styles.stickyWrapper}>
            <motion.h2 
              className={styles.title}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {data.title}
            </motion.h2>
            <motion.p
              className={styles.desc}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              اكتشف مجموعة واسعة من التحاليل الطبية الدقيقة التي نقدمها باستخدام أحدث التقنيات لضمان صحتك وسلامتك.
            </motion.p>
          </div>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.grid}>
            {data.list.map((service: string, index: number) => (
              <motion.div 
                key={index}
                className={styles.card}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className={styles.iconBox}>
                  <CheckCircle2 size={28} />
                </div>
                <span className={styles.text}>{service}</span>
                <div className={styles.cardGlow}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
