import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';
import styles from './Packages.module.css';
import type { PackagesContent, Package } from '../../types';

const Packages = ({ data }: { data: PackagesContent }) => {
  const { content } = useAppContext();

  const getWhatsappLink = (pkgName: string) => {
    if (!content) return '#';
    const msg = `${content.contact.whatsapp_msg} ${pkgName}`;
    return `https://wa.me/201005381032?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="packages" className={styles.packages}>
      <div className="container">
        <motion.h2 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {data.title}
        </motion.h2>

        <div className={styles.grid}>
          {data.list.map((pkg: Package, index: number) => {
            const savings = pkg.old_price - pkg.new_price;
            return (
              <motion.div 
                key={pkg.id}
                className={`glass ${styles.card}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.discountBadge}>- {Math.round((savings / pkg.old_price) * 100)}%</div>
                <div className={styles.cardHeader}>
                  <h3>{pkg.name}</h3>
                  <p className={styles.desc}>{pkg.desc}</p>
                </div>
                
                <div className={styles.pricing}>
                  <div className={styles.oldPrice}>
                    {pkg.old_price} {pkg.currency}
                  </div>
                  <div className={styles.newPrice}>
                    {pkg.new_price} <span>{pkg.currency}</span>
                  </div>
                  <div className={styles.savings}>
                    وفر {savings} {pkg.currency}
                  </div>
                </div>

                <a 
                  href={getWhatsappLink(pkg.name)}
                  target="_blank" 
                  rel="noreferrer"
                  className={`btn-primary ${styles.bookBtn}`}
                >
                  احجز الآن
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Packages;
