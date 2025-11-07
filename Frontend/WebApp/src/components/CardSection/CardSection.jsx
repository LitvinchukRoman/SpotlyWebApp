import Container from '../Container/Container.jsx';
import CardLibrary from './CardLibrary/CardLibrary.jsx';
import styles from './CardSection.module.scss';

const CardSection = ({ title }) => {
  return (
    <section className={styles.card__section}>
      <Container className={styles.card__container}>
        <div className={styles.card__header}>
            <h2>{title}</h2>
            <button className='btn-secondary'>Переглянути всі події
                <img src="./images/arrow-right.svg" alt="" />
            </button>
        </div>
        <CardLibrary />
      </Container>
    </section>
  );
};

export default CardSection;