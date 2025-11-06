import styles from './Categories.module.scss';
import CategoryButton from '../CategoryButton/CategoryButton.jsx';

const categories = [
  { icon: './images/music.svg', label: 'Музика' },
  { icon: './images/business.svg', label: 'Бізнес & Нетворкінг' },
  { icon: './images/drinks.svg', label: 'Їжа & Напої' },
  { icon: './images/health.svg', label: 'Здоров’я & Баланс' },
  { icon: './images/family.svg', label: 'Сім’я & Діти' },
  { icon: './images/art.svg', label: 'Мистецтво & Культура' },
  { icon: './images/sport.svg', label: 'Спорт & Рух' },
  { icon: './images/education.svg', label: 'Навчання' },
  { icon: './images/travelling.svg', label: 'Подорожі & Відпочинок' },
  { icon: './images/technologies.svg', label: 'Благодійність' },
  { icon: './images/technologies.svg', label: 'Благодійність' },
  { icon: './images/technologies.svg', label: 'Благодійність' },
  { icon: './images/technologies.svg', label: 'Благодійність' },
  { icon: './images/technologies.svg', label: 'Благодійність' },
  { icon: './images/technologies.svg', label: 'Благодійність' },
];

export default function Categories() {
  return (
    <section className={styles.categories}>
      {categories.map((cat, i) => (
        <div className={styles.categoryItem} key={i}>
          <CategoryButton key={i} icon={cat.icon} label={cat.label} />
        </div>
      ))}
    </section>
  );
}