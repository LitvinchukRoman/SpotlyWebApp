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
];

export default function Categories() {
  return (
    <ul className={styles.categories}>
      {categories.map((cat, i) => {
        let extraClass = '';

        if (cat.label === 'Музика') {
          extraClass = styles.music__highlight;
        } else if (cat.label === 'Їжа & Напої') {
          extraClass = styles.food__highlight;
        }

        return (
          <li key={i} className={styles.category__item}>
            <CategoryButton
              icon={cat.icon}
              label={cat.label}
              bigSize={true}
              extraClass={extraClass} 
            />
            <p className="text-14">{cat.label}</p>
          </li>
        );
      })}
    </ul>
  );
}