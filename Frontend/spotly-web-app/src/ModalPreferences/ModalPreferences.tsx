import React from 'react';
import modalStyles from './ModalPreferences.module.scss';

type isModal = {
  setIsModalPreferen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalPreferences: React.FC<isModal> = ({ setIsModalPreferen }) => {
  const closeModal = () => setIsModalPreferen(false)

  return (
    <>
      <div className={modalStyles.modalPreferences}>
        <div className={modalStyles.modalPreferences__window}>
          <h3 className={modalStyles.modalPreferences__title}>Обери, що надихає саме тебе</h3>
          <div className={modalStyles.modalPreferences__subtitle}>Щоб ми могли показати події, які тобі дійсно цікаві</div>

          <div className={modalStyles.modalPreferences__preferences}>
            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/music.svg" alt="music" />
              Музика
            </button>

            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/hugeicons_wellness.svg" alt="health" />
              Здоров'я & Добробут
            </button>
            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/kid.svg" alt="family" />

              Сім'я & Діти
            </button>
            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/sport.svg" alt="sport" />

              Спорт & Фітнес
            </button>
            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/learn.svg" alt="learning" />

              Семінари & Навчання
            </button>
            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/paint-board.svg" alt="art and culture" />

              Мистецтво & Культура
            </button>
            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/briefcase-01.svg" alt="business" />

              Бізнес & Нетворкінг
            </button>
            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/drink.svg" alt="food" />

              Їжа & Напої</button>
            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/laptop.svg" alt="tachnologies" />

              Технології & Інновації
            </button>
            <button className={modalStyles.modalPreferences__desicion}>
              <img src="../../public/images/icons/maps-global-01.svg" alt="adventures" />

              Подорожі & Відпочинок
            </button>
          </div>

          <button className={modalStyles.modalPreferences__ready} disabled>Готово</button>
          <button className={modalStyles.modalPreferences__continue} onClick={closeModal}>Пропустити</button>
        </div>
      </div>
    </>
  );
};

export default ModalPreferences;