import CitySearchSelect from '../CitySearchSelect/CitySearchSelect';
import type { ModalProps } from '../resuable/types';
import cn from 'classnames';
import { TopBar } from '../TopBar/TopBar';
// import { TopBar } from '../TopBar/TopBar';
import headerStyles from './HeaderTop.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// import './swiper-wrapper.scss';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Props = {
  onOpen: () => void;
  onClosePreferences: () => void;
  isOpenPreferences: boolean;
  modalProps: ModalProps;
};

const HeaderTop: React.FC<Props> = ({ onOpen, onClosePreferences, isOpenPreferences, modalProps }) => {

  return (
    <>
      <div className={headerStyles.header}>
        <TopBar
          onOpen={onOpen}
          onClosePreferences={onClosePreferences}
          isOpenPreferences={isOpenPreferences}
          modalProps={modalProps}
        />

        <h1 className={headerStyles.header__title}>Досі не знаєш, що робити сьогодні?</h1>

        <div className={headerStyles.header__subTitle}>
          У світі стільки всього відбувається — не пропусти своє. <br />
          Досліджуй, зустрічай, створюй спогади з Spotly
        </div>

        <div className={headerStyles.header__searchBarContainer}>
          <input
            type="text"
            placeholder="Шукати події..."
            className={headerStyles.header__seekEvents}
            id='#town'
          />

          <div className={headerStyles.header__seekTownsWraper}>
            <CitySearchSelect />
          </div>

          <button>
            <img src="./images/button-seek-for.svg" alt="seek for" />
          </button>

          <img 
            src="./images/icons/arrow-down-bkack-1.svg" 
            alt="img"
            className={headerStyles.header__seekArrowDown}
          />

          <img 
            src="../../public/images/icons/location-black.svg" 
            alt=""
            className={headerStyles.header__location}/>
        </div>

        <div className={headerStyles.header__decisions}>
          <Swiper
            spaceBetween={'12'}
            slidesPerView={'auto'}
            modules={[Navigation, Pagination]}
          >
            <SwiperSlide className={headerStyles.header__swiperSlide}>
              <button className={headerStyles.header__singleDecision}>
                <img src="./images/music-2.svg" alt="" className={headerStyles.header__decisionsImage} />
                Музика
              </button>
            </SwiperSlide>

            <SwiperSlide className={headerStyles.header__swiperSlide}>
              <button className={headerStyles.header__singleDecision}>
                <img src="./images/breafe-case.svg" alt="" className={headerStyles.header__decisionsImage} />
                Бізнес & Нетворкінг
              </button>
            </SwiperSlide>

            <SwiperSlide className={headerStyles.header__swiperSlide}>
              <button className={headerStyles.header__singleDecision}>
                <img src="./images/food.svg" alt="" className={headerStyles.header__decisionsImage} />
                Їжа & Напої
              </button>
            </SwiperSlide>

            <SwiperSlide className={headerStyles.header__swiperSlide}>
              <button className={headerStyles.header__singleDecision}>
                <img src="./images/balance-2.svg" alt="" className={headerStyles.header__decisionsImage} />
                Здоров’я & Баланс
              </button>
            </SwiperSlide>

            <SwiperSlide className={headerStyles.header__swiperSlide}>
              <button className={headerStyles.header__singleDecision}>
                <img src="./images/family.svg" alt="" className={headerStyles.header__decisionsImage} />
                Сім’я & Діти
              </button>
            </SwiperSlide>

            <SwiperSlide className={headerStyles.header__swiperSlide}>
              <button className={headerStyles.header__singleDecision}>
                <img src="./images/art.svg" alt="" className={headerStyles.header__decisionsImage} />
                Мистецтво & Культура
              </button>
            </SwiperSlide>

            <SwiperSlide className={cn(headerStyles.header__swiperSlide, headerStyles['header__swiperSlide--last'])}>
              <button className={headerStyles.header__singleDecision}>
                <img src="./images/sport-2.svg" alt="" className={headerStyles.header__decisionsImage} />
                Спорт & Рух
              </button>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default HeaderTop;
