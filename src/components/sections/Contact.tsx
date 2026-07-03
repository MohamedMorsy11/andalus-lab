import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, Send } from 'lucide-react';
import styles from './Contact.module.css';
import type { ContactContent } from '../../types';

const Contact = ({ data }: { data: ContactContent }) => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={`container ${styles.container}`}>
        <motion.div 
          className={styles.info}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>{data.title}</h2>
          
          <div className={styles.details}>
            <div className={styles.item}>
              <MapPin className={styles.icon} size={28} />
              <div>
                <h4>العنوان / Address</h4>
                <p>{data.address}</p>
              </div>
            </div>
            
            <div className={styles.item}>
              <Clock className={styles.icon} size={28} />
              <div>
                <h4>مواعيد العمل / Hours</h4>
                <p>{data.hours}</p>
              </div>
            </div>
            
            <div className={styles.item}>
              <Phone className={styles.icon} size={28} />
              <div>
                <h4>الهاتف / Phone</h4>
                <p>{data.phone}</p>
              </div>
            </div>
          </div>

          <a 
            href="https://wa.me/201005381032" 
            target="_blank" 
            rel="noreferrer" 
            className={`btn-primary ${styles.whatsappBtn}`}
          >
            <Send size={20} />
            تواصل معنا عبر واتساب
          </a>
        </motion.div>

        <motion.div 
          className={styles.map}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <iframe 
            src="https://maps.google.com/maps?q=30.7865086,31.0003757&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={false} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
