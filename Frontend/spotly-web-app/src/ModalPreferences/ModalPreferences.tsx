import React, { useState } from 'react';
import modalStyles from './ModalPreferences.module.scss';
import cn from 'classnames';

type isModal = {
  onClosePreferences: () => void;
}

enum PreferenceType {
  MUSIC = 'Музика',
  HEALTH_WELLNESS = 'Здоров\'я & Баланс',
  FAMILY_KIDS = 'Сім\'я & Діти',
  SPORT_FITNESS = 'Спорт & Рух',
  SEMINARS_TRAINING = 'Семінари & Навчання',
  ART_CULTURE = 'Мистецтво & Культура',
  BUSINESS_NETWORKING = 'Бізнес & Нетворкінг',
  FOOD_DRINKS = 'Їжа & Напої',
  TECH_INNOVATION = 'Технології & Інновації',
  TRAVEL_LEISURE = 'Подорожі & Відпочинок',
}

const ModalPreferences: React.FC<isModal> = ({ onClosePreferences }) => {
  const [interests, setInterests] = useState<string[]>([]);

  const toggleInterest = (value: string) => {
    setInterests(prevInterests => {

      const isSelected = prevInterests.includes(value);
      const currentLength = prevInterests.length;

      if (isSelected) {
        return prevInterests.filter(i => i !== value);
      } else if (currentLength < 3) {
        return [...prevInterests, value];
      } else {
        return prevInterests;
      }
    });
  };

  console.log(interests);

  const getIconPath = (
    currentInterest: PreferenceType,
    activePath: string,
    defaultPath: string,
    limitPath: string
  ): string => {

    const isSelected = interests.includes(currentInterest);

    const isUnderLimit = interests.length < 3;

    if (isSelected) {
      return activePath;
    }

    if (isUnderLimit) {
      return defaultPath;
    }

    return limitPath;
  };

  return (
    <>
      <div className={modalStyles.modalPreferences}>
        <div className={modalStyles.modalPreferences__window}>
          <h3 className={modalStyles.modalPreferences__title}>Обери, що надихає саме тебе</h3>
          <div className={modalStyles.modalPreferences__subtitle}>Щоб ми могли показати події, які тобі дійсно цікаві</div>

          <div className={modalStyles.modalPreferences__preferences}>
            <button
              className={cn(modalStyles.modalPreferences__desicion, {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.MUSIC),

                [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.MUSIC),
              })}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
              value={PreferenceType.MUSIC}
            >
              <img
                src={getIconPath(
                  PreferenceType.MUSIC,
                  './images/music.svg',
                  './images/icons/music.svg',
                  './images/music-1.svg',
                )}
                alt="music" />
              Музика
            </button>

            <button
              className={cn(modalStyles.modalPreferences__desicion, {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.HEALTH_WELLNESS),

                [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.HEALTH_WELLNESS),
              })}
              value={PreferenceType.HEALTH_WELLNESS}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
            >
              <img
                src={getIconPath(
                  PreferenceType.HEALTH_WELLNESS,
                  './images/hugeicons_wellness.svg',
                  './images/icons/hugeicons_wellness.svg',
                  './images/hugeicons_wellness-1.svg',
                )}
                alt="health"
              />
              Здоров'я & Баланс
            </button>

            <button
              className={cn(modalStyles.modalPreferences__desicion, {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.FAMILY_KIDS),

                [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.FAMILY_KIDS),
              })}
              value={PreferenceType.FAMILY_KIDS}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
            >
              <img
                src={getIconPath(
                  PreferenceType.FAMILY_KIDS,
                  './images/kid.svg',
                  './images/icons/kid.svg',
                  './images/kid-1.svg',
                )}
                alt="family"
              />

              Сім'я & Діти
            </button>

            <button
              className={cn(
                modalStyles.modalPreferences__desicion,
                modalStyles['modalPreferences__desicion--sport'], {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.SPORT_FITNESS),

                [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.SPORT_FITNESS),
              })}
              value={PreferenceType.SPORT_FITNESS}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
            >
              <img
                src={getIconPath(
                  PreferenceType.SPORT_FITNESS,
                  './images/sport.svg',
                  './images/icons/sport.svg',
                  './images/sport-1.svg',
                )}
                alt="sport"
              />
              Спорт & Рух
            </button>

            <button
              className={cn(modalStyles.modalPreferences__desicion, {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.SEMINARS_TRAINING),

                [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.SEMINARS_TRAINING),
              })}
              value={PreferenceType.SEMINARS_TRAINING}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
            >
              <img
                src={getIconPath(
                  PreferenceType.SEMINARS_TRAINING,
                  './images/learn.svg',
                  './images/icons/learn.svg',
                  './images/learn-1.svg',
                )}
                alt="learning"
              />
              Семінари & Навчання
            </button>

            <button
              className={cn(modalStyles.modalPreferences__desicion, {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.ART_CULTURE),

                [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.ART_CULTURE),
              })}
              value={PreferenceType.ART_CULTURE}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
            >
              <img
                src={getIconPath(
                  PreferenceType.ART_CULTURE,
                  './images/paint-board.svg',
                  './images/icons/paint-board.svg',
                  './images/paint-board-1.svg',
                )}
                alt="art and culture"
              />

              Мистецтво & Культура
            </button>

            <button
              className={cn(modalStyles.modalPreferences__desicion, {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.BUSINESS_NETWORKING),

                [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.BUSINESS_NETWORKING),
              })}
              value={PreferenceType.BUSINESS_NETWORKING}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
            >
              <img
                src={getIconPath(
                  PreferenceType.BUSINESS_NETWORKING,
                  './images/briefcase-01.svg',
                  './images/icons/briefcase-01.svg',
                  './images/briefcase-01-1.svg',
                )}
                alt="business"
              />

              Бізнес & Нетворкінг
            </button>

            <button
              className={cn(modalStyles.modalPreferences__desicion, {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.FOOD_DRINKS),

                [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.FOOD_DRINKS),
              })}
              value={PreferenceType.FOOD_DRINKS}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
            >
              <img
                src={getIconPath(
                  PreferenceType.FOOD_DRINKS,
                  './images/drink.svg',
                  './images/icons/drink.svg',
                  './images/drink-1.svg',
                )}
                alt="food"
              />

              Їжа & Напої
            </button>

            <button
              className={cn(modalStyles.modalPreferences__desicion, {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.TECH_INNOVATION),

                [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.TECH_INNOVATION),
              })}
              value={PreferenceType.TECH_INNOVATION}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
            >
              <img
                src={getIconPath(
                  PreferenceType.TECH_INNOVATION,
                  './images/laptop.svg',
                  './images/icons/laptop.svg',
                  './images/laptop-1.svg',
                )}
                alt="tachnologies"
              />

              Технології & Інновації
            </button>

            <button
              className={cn(modalStyles.modalPreferences__desicion, {
                [modalStyles['modalPreferences__desicion--active']]:
                  interests.includes(PreferenceType.TRAVEL_LEISURE),
                
                  [modalStyles['modalPreferences__desicion--disabled']]:
                  interests.length === 3 && !interests.includes(PreferenceType.TRAVEL_LEISURE),
              })}
              value={PreferenceType.TRAVEL_LEISURE}
              onClick={(e) => toggleInterest(e.currentTarget.value)}
            >
              <img
                src={getIconPath(
                  PreferenceType.TRAVEL_LEISURE,
                  './images/maps-global-01.svg',
                  './images/icons/maps-global-01.svg',
                  './images/maps-global-01-1.svg',
                )}
                alt="adventures"
              />

              Подорожі & Відпочинок
            </button>
          </div>

          <button
            className={modalStyles.modalPreferences__ready}
            disabled={interests.length < 1 ? true : false}
            onClick={onClosePreferences}
          >Готово</button>
          <button className={modalStyles.modalPreferences__continue} onClick={onClosePreferences}>Пропустити</button>
        </div>
      </div>
    </>
  );
};

export default ModalPreferences;
