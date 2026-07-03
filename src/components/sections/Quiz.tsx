import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './HomeSections.module.css';
import type { QuizContent } from '../../types';

const Quiz = ({ data }: { data: QuizContent }) => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  return (
    <section className={styles.quizSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.quizCard}>
          {!started ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2>{data.title}</h2>
              <p>Start your diagnostic health check to find the best package for you.</p>
              <button className="btn-primary" onClick={() => setStarted(true)}>
                Start
              </button>
            </motion.div>
          ) : !finished ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3>{data.questions[0].q}</h3>
              <div className={styles.options}>
                <button className={styles.optionBtn} onClick={() => setFinished(true)}>{data.questions[0].options[0]}</button>
                <button className={styles.optionBtn} onClick={() => setFinished(true)}>{data.questions[0].options[1]}</button>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3>Based on your answers, we recommend the Comprehensive Package.</h3>
              <button className="btn-primary" onClick={() => { setStarted(false); setFinished(false); }}>
                Retake
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
