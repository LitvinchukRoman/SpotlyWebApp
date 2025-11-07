import styles from './EventCard.module.scss';
import CattegoryButton from '../../HeroSection/CategoryButton/CategoryButton.jsx';

const EventCard = ({ image, title, organizator, time, adress, price, categoryName, categoryImage}) => {
  return (
    <li className={styles.event__card}>
      <div className={styles.event__image__wrapper}>
        <img className={styles.event__image} src={image} alt={title} />
      </div>
      <CattegoryButton icon={categoryImage} label={categoryName}/>
      <div className={styles.event__info}>
        <h3>{title}</h3>
        <p className='body-16'>{organizator}</p>
      </div>
      <div className={styles.event__details}>
        <div className={styles.event__detail}>
          <img src="./images/date.svg" alt="date"/>
          <span className='text-14'>{time}</span>
        </div>
        <div className={styles.event__detail}>
          <img src="./images/place.svg" alt="place"/>
          <span className='text-14'>{adress}</span>
        </div>
        <div className={styles.event__detail}>
          <img src="./images/price.svg" alt="price"/>
          <span className='text-14'>{price}</span>
        </div>
      </div>
    </li>
  );
};

export default EventCard;