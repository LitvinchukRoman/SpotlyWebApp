import type React from "react";
import topBarStyles from './TopBar.module.scss';
import type { ModalProps } from "../resuable/types";

type Props = {
  onOpen: () => void;
  onClosePreferences: () => void;
  isOpenPreferences: boolean;
  modalProps: ModalProps;
};

export const TopBar: React.FC<Props> = ({ onOpen }) => {
  return (
    <>
      <div className={topBarStyles.topBar}>
        <h3 className={topBarStyles.topBar__logo}>Spotly</h3>

        <div className={topBarStyles.topBar__getAccount}>
          <button className={topBarStyles.topBar__logIn} onClick={onOpen}>Вхід</button>
          <button className={topBarStyles.topBar__registration}>Реєстрація</button>
        </div>
      </div>
    </>
  );
};
