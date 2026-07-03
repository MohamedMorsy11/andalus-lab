import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Moon, Sun, Globe } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { lang, setLang, theme, setTheme, content } = useAppContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!content) return null;

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} glass`}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <img src="/logo.png.png" alt="Andalus Lab" width="150" height="50" onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x50?text=Andalus+Lab'; }} />
        </div>
        
        <ul className={styles.navLinks}>
          <li><a href="#home">{content.nav.home}</a></li>
          <li><a href="#why-us">{content.nav.why_us}</a></li>
          <li><a href="#packages">{content.nav.packages}</a></li>
          <li><a href="#services">{content.nav.services}</a></li>
          <li><a href="#contact">{content.nav.contact}</a></li>
        </ul>

        <div className={styles.actions}>
          <button 
            className={styles.iconBtn} 
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            className={styles.iconBtn} 
            onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
            aria-label="Toggle Language"
          >
            <Globe size={20} />
            <span className={styles.langText}>{lang === 'ar' ? 'EN' : 'عربي'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
