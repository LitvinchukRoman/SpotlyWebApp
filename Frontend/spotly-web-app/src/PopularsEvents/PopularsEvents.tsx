import eventsStyle from './PopularsEvents..module.scss';
import cn from 'classnames';

const PopularsEvents = () => {

  return (
    <>
      <div className={eventsStyle.popEvents}>
        <div className={eventsStyle.popEvents__top}>
          <h2>Популярні події у Києві</h2>

          <button className={eventsStyle.popEvents__viewAll}>
            Переглянути всі події
            <img src="./images/icons/arrow-right-01-sharp.svg" alt="arrow" />
          </button>
        </div>

        <div className={cn(eventsStyle.popEvents__firstCategory, eventsStyle.popEvents__categories)}>
          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="../../public/images/startaps.png" alt="image" />
            <h3>Pitch Night: Стартапи в дії</h3>
            <div>Launch Point Ukraine</div>
          </div>
          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="../../public/images/motherHoodCouncil.png" alt="image" />
            <h3>Чесна розмова про материнство: без порад, тіль...</h3>
            <div>МамКом’юніті «Ми тут»</div>
          </div>
          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="../../public/images/bookEvents.png" alt="image" />
            <h3>Читаємо українське: Забужко vs Жадан</h3>
            <div>UkrBook Movement</div>
          </div>
          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="../../public/images/saturdays.png" alt="image" />
            <h3>Суботник на Пейзажці</h3>
            <div>Еко-ініціатива «Green Kyiv»</div>
          </div>
        </div>

        <div className={eventsStyle.popEvents__top}>
          <h2>Нові події</h2>

          <button>
            Переглянути всі події
            <img src="./images/icons/arrow-right-01-sharp.svg" alt="arrow" />
          </button>
        </div>

        <div className={cn(eventsStyle.popEvents__secondCategory, eventsStyle.popEvents__categories)}>
          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="../../public/images/picnic.png" alt="image" />
            <h3>Пікнік на заході сонця біля Дніпра</h3>
            <div>Яна Ярмоленко</div>
          </div>
          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="../../public/images/tableGames.png" alt="image" />
            <h3>Настолки та пиво в М’ясторії</h3>
            <div>Дмитро Навроцький</div>
          </div>
          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="../../public/images/adventures.png" alt="image" />
            <h3>Маленька подорож у Карпати: Синевир на 2 дні</h3>
            <div>Костянтин Задорожній</div>
          </div>
          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="../../public/images/films.png" alt="image" />
            <h3>Кіновечір на березі Дніпра: Barbie vs Oppenheimer</h3>
            <div>КіноКлуб «Frame by Frame»</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularsEvents;
