import CitySearchSelect from '../CitySearchSelect/CitySearchSelect';
import type { ModalProps } from '../resuable/types';
import { TopBar } from '../TopBar/TopBar';
import headerStyles from './Header.module.scss';

type Props = {
  onOpen: () => void;
  onClosePreferences: () => void;
  isOpenPreferences: boolean;
  modalProps: ModalProps;
};

const Header: React.FC<Props> = ({ onOpen, onClosePreferences, isOpenPreferences, modalProps }) => {
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
        </div>

        <div className={headerStyles.header__decisions}>
          <button>
            <img src="" alt="" />
          </button>
          <button>
            <img src="" alt="" />
          </button>
          <button>
            <img src="" alt="" />
          </button>
          <button>
            <img src="" alt="" />
          </button>
          <button>
            <img src="" alt="" />
          </button>
          <button>
            <img src="" alt="" />
          </button>
          <button>
            <img src="" alt="" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
