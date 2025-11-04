import howSpotlyWorks from './HowSpotlyWorks.module.scss';

const HowSpotlyWorks = () => {
  return (
    <>
      <div className={howSpotlyWorks.works}>
        <h2 className={howSpotlyWorks.works__title}>Як працює Spotly</h2>

        <div className={howSpotlyWorks.works__functions}>
          <div className={howSpotlyWorks.works__singleFunction}>
            <img
              src="./images/find-hobbies.svg"
              alt="img"
              className={howSpotlyWorks.works__functionIcon} 
            />
            <h3 className={howSpotlyWorks.works__action} >Знайди, що тебе драйвить</h3>
            <div className={howSpotlyWorks.works__describe}>Гортай, шукай, вибирай — концерти, вечірки, тренінги, що завгодно.</div>
          </div>

          <div className={howSpotlyWorks.works__singleFunction}>
            <img
              src="./images/find-people.svg"
              alt="img"
              className={howSpotlyWorks.works__functionIcon} 
            />
            <h3 className={howSpotlyWorks.works__action} >Долучайся та знайомся</h3>
            <div className={howSpotlyWorks.works__describe}>Тисни “Йду” і ти вже в темі. Дивись, хто ще йде, знайомся, плануй вечір разом.</div>
          </div>

          <div className={howSpotlyWorks.works__singleFunction}>
            <img
              src="./images/add-someth.svg"
              alt="img"
              className={howSpotlyWorks.works__functionIcon} 
            />
            <h3 className={howSpotlyWorks.works__action} >Організуй своє</h3>
            <div className={howSpotlyWorks.works__describe}>Є ідея або тусовка? Створи подію й з’єднай людей навколо неї.</div>
          </div>
        </div>

      </div>
    </>
  );
};

export default HowSpotlyWorks;
