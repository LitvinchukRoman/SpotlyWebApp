import styles from './CardLibrary.module.scss';
import EventCard from '../EventCard/EventCard.jsx';

const categories = [
  {image: "./images/event1.png", title: "Pitch Night: Стартапи в дії", organizator: "Launch Point Ukraine", time: "П’ятниця, 26 жовтня, 19:00 - 23:00", adress: "Вул. Богдана Хмельницького, 148...", price: "Безкоштовно", categoryName: "Технології", categoryImage: "./images/technologies.svg"},
  {image: "./images/event2.jpg", title: "Чесна розмова про материнство: без порад, тіл...", organizator: "МамКом’юніті «Ми тут»", time: "Понеділок, 10 листопада, 10:00 - 12:00", adress: "Вул. Сагайдачного, 31, Київ", price: "Безкоштовно", categoryName: "Сім'я & Діти", categoryImage: "./images/family.svg"},
  {image: "./images/event3.jpg", title: "Читаємо українське: Забужко vs Жадан", organizator: "UkrBook Movement", time: "Cереда, 19 листопада, 17:00 - 20:00", adress: "Вул. Велика Васильківська, 128, Київ", price: "Безкоштовно", categoryName: "Здоров'я", categoryImage: "./images/health.svg"},
  {image: "./images/event4.jpg", title: "Суботник на Пейзажці", organizator: "Еко-ініціатива «Green Kyiv»", time: "Субота, 22 листопада, 10:00 - 12:00", adress: "Пейзажна алея, 7, Київ", price: "Безкоштовно", categoryName: "Мистецтво", categoryImage: "./images/art.svg"},
];

export default function CardLibrary() {
  return (
    <ul className={styles.card__library}>
        {categories.map((category, index) => (
            <EventCard
                key={index}
                image={category.image}
                title={category.title}
                organizator={category.organizator}
                time={category.time}
                adress={category.adress}
                price={category.price}
                categoryName={category.categoryName}
                categoryImage={category.categoryImage}
            />
        ))}
    </ul>
  );
}