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
            <img src="./images/startaps.png" alt="image" />
            <h3 className={eventsStyle.popEvents__nameOfEvent}>Pitch Night: Стартапи в дії</h3>
            <div className={eventsStyle.popEvents__community}>Launch Point Ukraine</div>
            <div className={eventsStyle.popEvents__line}></div>
          </div>

          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="./images/motherHoodCouncil.png" alt="image" />
            <h3 className={eventsStyle.popEvents__nameOfEvent}>Чесна розмова про материнство: без порад, тіль...</h3>
            <div className={eventsStyle.popEvents__community}>МамКом’юніті «Ми тут»</div>
            <div className={eventsStyle.popEvents__line}></div>
          </div>

          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="./images/bookEvents.png" alt="image" />
            <h3 className={eventsStyle.popEvents__nameOfEvent}>Читаємо українське: Забужко vs Жадан</h3>
            <div className={eventsStyle.popEvents__community}>UkrBook Movement</div>
            <div className={eventsStyle.popEvents__line}></div>
          </div>

          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="./images/saturdays.png" alt="image" />
            <h3 className={eventsStyle.popEvents__nameOfEvent}>Суботник на Пейзажці</h3>
            <div className={eventsStyle.popEvents__community}>Еко-ініціатива «Green Kyiv»</div>
            <div className={eventsStyle.popEvents__line}></div>
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
            <img src="./images/picnic.png" alt="image" />
            <h3 className={eventsStyle.popEvents__nameOfEvent}>Пікнік на заході сонця біля Дніпра</h3>
            <div className={eventsStyle.popEvents__community}>Яна Ярмоленко</div>
            <div className={eventsStyle.popEvents__line}></div>
          </div>

          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="./images/tableGames.png" alt="image" />
            <h3 className={eventsStyle.popEvents__nameOfEvent}>Настолки та пиво в М’ясторії</h3>
            <div className={eventsStyle.popEvents__community}>Дмитро Навроцький</div>
            <div className={eventsStyle.popEvents__line}></div>
          </div>

          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="./images/adventures.png" alt="image" />
            <h3 className={eventsStyle.popEvents__nameOfEvent}>Маленька подорож у Карпати: Синевир на 2 дні</h3>
            <div className={eventsStyle.popEvents__community}>Костянтин Задорожній</div>
            <div className={eventsStyle.popEvents__line}></div>
          </div>

          <div className={eventsStyle.popEvents__singleEvent}>
            <img src="./images/films.png" alt="image" />
            <h3 className={eventsStyle.popEvents__nameOfEvent}>Кіновечір на березі Дніпра: Barbie vs Oppenheimer</h3>
            <div className={eventsStyle.popEvents__community}>КіноКлуб «Frame by Frame»</div>
            <div className={eventsStyle.popEvents__line}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopularsEvents;
