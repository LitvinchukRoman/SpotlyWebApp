import { useState, type FC, type PropsWithChildren } from 'react';
import type { ModalProps } from './useModal';
import ModalStyles from './Modal.module.scss'

type ModalLayoutProps = PropsWithChildren<ModalProps>;

const ModalLayout: FC<ModalLayoutProps> = ({ onClose, visible }) => {
  const [enterAccount, setEnterAccount] = useState<boolean>(false);

  if (!visible) return null;

  const onEnter = () => setEnterAccount(currentBoolean => !currentBoolean);

  return (
    <div className={ModalStyles.modal}>
      <div className={ModalStyles.modal__window} onClick={(e) => e.stopPropagation}>
        <button className={ModalStyles.modal__iconButton} onClick={onClose}>
          <img
            className={ModalStyles.modal__icon}
            src="../../public/images/icons/Close.svg"
            alt="close"
          />
        </button>

        <h3 className={`${ModalStyles.modal__title} ${ModalStyles.modal__text}`}>Створи акаунт Spotly</h3>

        <div className={`${ModalStyles.modal__describe} ${ModalStyles.modal__text}`}>Почни досліджувати події, створені для тебе</div>

        <div className={ModalStyles.modal__optionsNetworks}>
          <button className={ModalStyles.modal__option}>
            <img
              src="../../public/images/icons/Google.svg"
              alt="google"
              className={ModalStyles['modal__option--icon']}
            />
            Продовжити з Google
          </button>

          <button className={ModalStyles.modal__option}>
            <img
              src="../../public/images/icons/Apple.svg"
              alt="apple"
              className={ModalStyles['modal__option--icon']}
            />
            Продовжити з Apple
          </button>

          <button className={ModalStyles.modal__option}>
            <img
              src="../../public/images/icons/Facebook.svg"
              alt="facebook"
              className={ModalStyles['modal__option--icon']}
            />
            Продовжити з Facebook
          </button>
        </div>

        <div className={ModalStyles.modal__textWrapper}>
          <div className={`${ModalStyles.modal__text} ${ModalStyles.modal__textLine}`}>або</div>
        </div>

        {!enterAccount ? (
          <div>
            <div className={ModalStyles.modal__optionsNetworks}>
              <button className={`${ModalStyles.modal__option} ${ModalStyles['modal__option--email']}`}>Зареєструватися через email</button>
            </div>

            <div className={`${ModalStyles.modal__text} ${ModalStyles.modal__isAccount}`}>
              Вже маєш акаунт?&nbsp;
              <button className={ModalStyles.modal__letsRegistrait} onClick={onEnter}>Увійти</button>
            </div>
          </div>
        ) : (
          <div>
            <form action="post" className={ModalStyles.modal__login}>
              <label className={ModalStyles.modal__inputWrapper}>
                Email
                <input
                  className={ModalStyles.modal__input}
                  type="email"
                  placeholder='Введи email'
                />
              </label>
              <label className={ModalStyles['modal__inputWrapper--second']}>
                Пароль
                <input 
                  className={ModalStyles.modal__input} 
                  type="password"
                  placeholder='Введи пароль'
                />
              </label>

                <button className={`
                    ${ModalStyles.modal__option}
                    ${ModalStyles['modal__option--email']}
                  `}
                  type="button">Увійти</button>
            </form>

            <div className={`${ModalStyles.modal__text} ${ModalStyles['modal__text--question']}`}>Забув пароль?</div>

            <div className={`${ModalStyles.modal__text} ${ModalStyles.modal__isAccount}`}>
              Ще не маєш акаунту?&nbsp;
              <button className={ModalStyles.modal__letsRegistrait} onClick={onEnter}>Зареєструватися</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalLayout;
