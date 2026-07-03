import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './HomeSections.module.css';
import type { FAQContent } from '../../types';

const FAQ = ({ data }: { data: FAQContent }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className={styles.faqSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{data.title}</h2>
        <div className={styles.faqList}>
          {data.list.map((item, idx) => (
            <div 
              key={idx} 
              className={`${styles.faqItem} ${openIndex === idx ? styles.faqOpen : ''}`}
            >
              <button 
                className={styles.faqQuestion} 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
                aria-controls={`faq-answer-${idx}`}
              >
                <span>{item.q}</span>
                {openIndex === idx ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIndex === idx && (
                <motion.div 
                  id={`faq-answer-${idx}`}
                  className={styles.faqAnswer}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                >
                  <p>{item.a}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
