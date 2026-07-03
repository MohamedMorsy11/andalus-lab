import { motion } from 'framer-motion';
import styles from './Doctor.module.css';
import type { DoctorContent } from '../../types';

const Doctor = ({ data }: { data: DoctorContent }) => {
  return (
    <section id="doctor" className={styles.doctor}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.imageWrapper}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.imagePlaceholder}>
            <img src="/doctor.png" alt={data.name} loading="lazy" width="450" height="562" />
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h2 className={styles.title}>{data.title}</h2>
          <h3 className={styles.name}>{data.name}</h3>
          <p className={styles.role}>{data.role}</p>
          <div className={styles.divider}></div>
          <p className={styles.desc}>{data.desc}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Doctor;
