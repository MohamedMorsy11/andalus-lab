import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Download, Upload, Save, ArrowLeft, Settings, Users, Package, Stethoscope, MessageSquare, HelpCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Admin.module.css';
import type { SiteContent } from '../types';

const Admin = () => {
  const { updateContent } = useAppContext();
  const [formData, setFormData] = useState<{ar: SiteContent, en: SiteContent} | null>(null);
  const [activeTab, setActiveTab] = useState<'ar'|'en'>('ar');
  const [activeSection, setActiveSection] = useState('hero');
  const [toast, setToast] = useState('');

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(err => console.error(err));
  }, []);

  if (!formData) return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p>Loading Admin Dashboard...</p>
    </div>
  );

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleExport = () => {
    try {
      const blob = new Blob([JSON.stringify(formData, null, 2)], { type: 'application/json' });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = 'content.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Exported successfully');
    } catch (e) {
      showToast('Export failed');
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        setFormData(parsed);
        // We only update context with current language
        updateContent(parsed[activeTab]); 
        showToast('Imported successfully');
      } catch (e) {
        showToast('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const handleSaveToPreview = () => {
    try {
      updateContent(formData[activeTab]);
      showToast('Preview updated & saved locally!');
    } catch (e) {
      showToast('Failed to update preview');
    }
  };

  const updateField = (path: string[], value: any) => {
    const newData = { ...formData };
    let current: any = newData[activeTab];
    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;
    setFormData(newData);
  };

  const renderInput = (label: string, path: string[], type: string = 'text') => {
    let val: any = formData[activeTab];
    for (let p of path) val = val[p];
    
    if (type === 'textarea') {
      return (
        <div className={styles.formGroup}>
          <label>{label}</label>
          <textarea value={val || ''} onChange={(e) => updateField(path, e.target.value)} rows={4} />
        </div>
      );
    }
    
    return (
      <div className={styles.formGroup}>
        <label>{label}</label>
        <input type={type} value={val || ''} onChange={(e) => updateField(path, type === 'number' ? Number(e.target.value) : e.target.value)} />
      </div>
    );
  };

  const renderPackages = () => {
    const pkgs = formData[activeTab].packages.list;
    return (
      <div className={styles.listContainer}>
        {pkgs.map((pkg: any, idx: number) => (
          <div key={pkg.id} className={styles.listItem}>
            <h4>Package {idx + 1}</h4>
            <div className={styles.grid2}>
              {renderInput('Name', ['packages', 'list', idx.toString(), 'name'])}
              {renderInput('Features (Comma separated)', ['packages', 'list', idx.toString(), 'features'])}
              {renderInput('Old Price', ['packages', 'list', idx.toString(), 'old_price'])}
              {renderInput('New Price', ['packages', 'list', idx.toString(), 'new_price'])}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.adminPage} dir="ltr">
      {toast && (
        <div className={styles.toast}>
          <CheckCircle size={18} /> {toast}
        </div>
      )}

      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>Admin Center</h2>
          <Link to="/" className={styles.backLink}><ArrowLeft size={16} /> Live Preview</Link>
        </div>
        
        <div className={styles.langToggle}>
          <button className={activeTab === 'en' ? styles.active : ''} onClick={() => setActiveTab('en')}>EN</button>
          <button className={activeTab === 'ar' ? styles.active : ''} onClick={() => setActiveTab('ar')}>AR</button>
        </div>

        <nav className={styles.navMenu}>
          <button className={activeSection === 'hero' ? styles.active : ''} onClick={() => setActiveSection('hero')}><Settings size={18}/> Global & Hero</button>
          <button className={activeSection === 'packages' ? styles.active : ''} onClick={() => setActiveSection('packages')}><Package size={18}/> Pricing</button>
          <button className={activeSection === 'doctor' ? styles.active : ''} onClick={() => setActiveSection('doctor')}><Stethoscope size={18}/> Staff</button>
          <button className={activeSection === 'services' ? styles.active : ''} onClick={() => setActiveSection('services')}><Users size={18}/> Features</button>
          <button className={activeSection === 'faq' ? styles.active : ''} onClick={() => setActiveSection('faq')}><HelpCircle size={18}/> FAQ</button>
          <button className={activeSection === 'reviews' ? styles.active : ''} onClick={() => setActiveSection('reviews')}><MessageSquare size={18}/> Reviews</button>
        </nav>
      </div>

      <div className={styles.main}>
        <div className={styles.header}>
          <h1>Editing {activeSection.toUpperCase()}</h1>
          <div className={styles.actions}>
            <label className={`btn-secondary ${styles.btnUpload}`}>
              <Upload size={18} /> Import JSON
              <input type="file" accept=".json" onChange={handleImport} style={{ display: 'none' }} />
            </label>
            <button className={`btn-secondary ${styles.btnExport}`} onClick={handleExport}>
              <Download size={18} /> Backup
            </button>
            <button className={`btn-primary ${styles.btnSave}`} onClick={handleSaveToPreview}>
              <Save size={18} /> Publish to Preview
            </button>
          </div>
        </div>

        <div className={styles.formContainer}>
          {activeSection === 'hero' && (
            <div className={styles.section}>
              <h3>Hero Banner</h3>
              {renderInput('Headline', ['hero', 'title'])}
              {renderInput('Sub headline', ['hero', 'subtitle'])}
              {renderInput('Body Text', ['hero', 'description'], 'textarea')}
              
              <h3 className={styles.mt4}>Company Info</h3>
              {renderInput('Location', ['contact', 'address'])}
              {renderInput('Phone Number', ['contact', 'phone'])}
              {renderInput('WhatsApp', ['contact', 'whatsapp'])}
            </div>
          )}

          {activeSection === 'packages' && (
            <div className={styles.section}>
              <h3>Subscription Packages</h3>
              {renderPackages()}
            </div>
          )}

          {activeSection === 'doctor' && (
            <div className={styles.section}>
              <h3>Medical Staff</h3>
              {renderInput('Full Name', ['doctor', 'name'])}
              {renderInput('Job Title', ['doctor', 'title'])}
              {renderInput('Biography', ['doctor', 'desc'], 'textarea')}
            </div>
          )}

          {activeSection === 'services' && (
            <div className={styles.section}>
              <h3>Medical Services</h3>
              <p>For nested array structures, we recommend using the JSON Backup/Import flow for full structural control.</p>
              {renderInput('Section Title', ['services', 'title'])}
            </div>
          )}
          
          {(activeSection === 'faq' || activeSection === 'reviews') && (
            <div className={styles.section}>
              <h3>{activeSection.toUpperCase()} Content</h3>
              <p>Complex arrays like Reviews and FAQ nodes are best managed via raw JSON export/import.</p>
              {renderInput('Section Title', [activeSection, 'title'])}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
