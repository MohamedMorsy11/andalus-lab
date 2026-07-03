import styles from './HomeSections.module.css';
import type { ReviewsContent } from '../../types';

const Reviews = ({ data }: { data: ReviewsContent }) => {
  return (
    <section className={styles.reviewsSection}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{data.title}</h2>
        <div className={styles.reviewsScroll}>
          {data.list.map((review, idx) => (
            <div key={idx} className={styles.reviewCard}>
              <p className={styles.reviewText}>"{review.text}"</p>
              <h4 className={styles.reviewName}>{review.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
