import styles from './Footer.module.css';
import type { FooterContent } from '../types';

const Footer = ({ data }: { data: FooterContent }) => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <img src="/logo.png.png" alt="Andalus Lab" className={styles.footerLogo} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        <p>{data.text}</p>
      </div>
    </footer>
  );
};

export default Footer;
