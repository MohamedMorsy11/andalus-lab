import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, Users, Clock, Award, Microscope } from 'lucide-react';
import styles from './WhyUs.module.css';
import type { WhyUsContent, Feature } from '../../types';

const icons: Record<string, React.ReactNode> = {
  'shield': <ShieldCheck className={styles.icon} size={32} />,
  'activity': <Activity className={styles.icon} size={32} />,
  'users': <Users className={styles.icon} size={32} />,
  'clock': <Clock className={styles.icon} size={32} />,
  'award': <Award className={styles.icon} size={32} />,
  'microscope': <Microscope className={styles.icon} size={32} />
};

const WhyUs = ({ data }: { data: WhyUsContent }) => {
  return (
    <section id="why-us" className={styles.whyUs}>
      <div className="container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.title}>{data.title}</h2>
          <div className={styles.headerLine}></div>
        </motion.div>
        
        <div className={styles.grid}>
          {data.features.map((feature: Feature, index: number) => (
            <motion.div 
              key={feature.id}
              className={`${styles.card} ${index % 2 !== 0 ? styles.cardOffset : ''}`}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.cardNumber}>0{index + 1}</div>
              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  {icons[feature.id]}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
