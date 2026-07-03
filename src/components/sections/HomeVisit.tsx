import { motion } from 'framer-motion';
import { Home as HomeIcon } from 'lucide-react';
import styles from './HomeVisit.module.css';
import type { HomeVisitContent } from '../../types';

const HomeVisit = ({ data }: { data: HomeVisitContent }) => {
  const getWhatsappLink = () => {
    const msg = "السلام عليكم، أريد حجز زيارة منزلية لسحب عينة.";
    return `https://wa.me/201005381032?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section className={styles.homeVisit}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <HomeIcon size={48} className={styles.icon} />
          <h2>{data.title}</h2>
          <p>{data.desc}</p>
          <a 
            href={getWhatsappLink()} 
            target="_blank" 
            rel="noreferrer" 
            className="btn-primary"
          >
            {data.cta}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeVisit;
