import { useState, type FC, type PropsWithChildren, useRef } from 'react';
import type { ModalProps } from './useModal';
import ModalStyles from './Modal.module.scss'

type ModalLayoutProps = PropsWithChildren<ModalProps>;

const ModalLayout: FC<ModalLayoutProps> = ({ onClose, visible, onOpenPreferences }) => {
  const [enterAccount, setEnterAccount] = useState<boolean>(false);
  const [registrait, setRegistrait] = useState(false);
  const [isOpenEye, setIsOpenEye] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  if (!visible) return null;

  const onEnter = () => setEnterAccount(currentBoolean => !currentBoolean);
  const onRegistrait = () => setRegistrait(currentBoolean => !currentBoolean);
  const onOpenEye = () => setIsOpenEye(currentBoolean => !currentBoolean);

  const handleScrollToTop = () => {
    const modal = modalRef.current;

    if (modal) {
      modal.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  console.log(modalRef.current);

  return (
    <div className={ModalStyles.modal}>
      <div
        className={ModalStyles.modal__window}
        ref={modalRef}
        onClick={(e) => e.stopPropagation}
      >
        {!registrait ? (
          <>
            <button className={ModalStyles.modal__iconButton} onClick={onClose}>
              <img
                className={ModalStyles.modal__icon}
                src="./public/images/icons/Close.svg"
                alt="close"
              />
            </button>

            {!enterAccount ? (
              <>
                <h3 className={`${ModalStyles.modal__title} ${ModalStyles.modal__text}`}>Створи акаунт Spotly</h3>
                <div className={`${ModalStyles.modal__describe} ${ModalStyles.modal__text}`}>Почни досліджувати події, створені для тебе</div>
              </>
            ) : (
              <>
                <h3 className={`${ModalStyles.modal__title} ${ModalStyles.modal__text}`}>Раді знову тебе бачити!</h3>
                <div className={`${ModalStyles.modal__describe} ${ModalStyles.modal__text}`}>Увійди, щоб знайти цікаві події та знайомства</div>
              </>
            )}

            <div className={ModalStyles.modal__optionsNetworks}>
              <button className={ModalStyles.modal__option}>
                <img
                  src="./public/images/icons/Google.svg"
                  alt="google"
                  className={ModalStyles['modal__option--icon']}
                />
                Продовжити з Google
              </button>

              <button className={ModalStyles.modal__option}>
                <img
                  src="./public/images/icons/Apple.svg"
                  alt="apple"
                  className={ModalStyles['modal__option--icon']}
                />
                Продовжити з Apple
              </button>

              <button className={ModalStyles.modal__option}>
                <img
                  src="./public/images/icons/Facebook.svg"
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
                  <button className={`
                    ${ModalStyles.modal__option} 
                    ${ModalStyles['modal__option--email']}`
                  } onClick={() => {
                    onRegistrait();
                    handleScrollToTop();
                  }}>Зареєструватися через email</button>
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
                      name='email'
                    />
                  </label>

                  <label className={ModalStyles['modal__inputWrapper--second']}>
                    Пароль
                    <div className={ModalStyles.modal__toggleIconWrapper}>
                      <input
                        type={isOpenEye ? 'text' : 'password'}
                        className={ModalStyles.modal__input}
                        placeholder='Введи пароль'
                        name='passord'
                      />

                      <span className={ModalStyles.modal__passwordToggleIcon}>
                        {!isOpenEye ? (
                          <img
                            src="./public/images/icons/eye_closed.svg"
                            alt="eye"
                            onClick={onOpenEye}
                          />
                        ) : (
                          <img
                            src="./public/images/icons/Eye_opened.svg"
                            alt="eye"
                            onClick={onOpenEye}
                          />
                        )}
                      </span>
                    </div>
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
                  <button
                    className={ModalStyles.modal__letsRegistrait}
                    onClick={() => {
                      onRegistrait();
                      handleScrollToTop();
                    }}>
                    Зареєструватися
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={ModalStyles.modal__topBar}>
              <button onClick={onRegistrait}>
                <img src="./public/images/icons/arrow-left.svg" alt="back" />
              </button>

              <button>
                <img src="./public/images/icons/Close.svg" alt="close" onClick={onClose} />
              </button>
            </div>
            <h3 className={ModalStyles.modal__text}>Майже готово!</h3>
            <div className={ModalStyles.modal__text}>Залишилось кілька деталей</div>

            <form action="post" className={ModalStyles.modal__login}>
              <label className={ModalStyles.modal__inputWrapper}>
                Ім'я
                <input
                  type="text"
                  className={ModalStyles.modal__input}
                  placeholder='Введи своє ім’я'
                  name='name'
                  autoComplete='true'
                />
              </label>

              <label className={ModalStyles.modal__inputWrapper}>
                Прізвище
                <input
                  type="text"
                  className={ModalStyles.modal__input}
                  name='surname'
                  placeholder='Введи своє прізвище'
                  autoComplete='true'
                />
              </label>

              <label className={ModalStyles.modal__inputWrapper}>
                Email
                <input
                  type="email"
                  className={ModalStyles.modal__input}
                  name='email'
                  placeholder='Введи email'
                  autoComplete='true'
                />
              </label>

              <label className={`${ModalStyles.modal__inputWrapper} ${ModalStyles['modal__inputWrapper--describe']}`}>
                Пароль
                <div className={ModalStyles.modal__toggleIconWrapper}>
                  <input
                    type={isOpenEye ? 'text' : 'password'}
                    className={ModalStyles.modal__input}
                    name='passord'
                    placeholder='Введи пароль'
                    autoComplete='true'
                  />

                  <span className={ModalStyles.modal__passwordToggleIcon}>
                    {!isOpenEye ? (
                      <img
                        src="./public/images/icons/eye_closed.svg"
                        alt="eye"
                        onClick={onOpenEye}
                      />
                    ) : (
                      <img
                        src="./public/images/icons/Eye_opened.svg"
                        alt="eye"
                        onClick={onOpenEye}
                      />
                    )}
                  </span>
                </div>
              </label>
              Мінімум 10 символів, велика літера, цифра й спецсимвол.

              <button type="button" className={`
                  ${ModalStyles.modal__option} 
                  ${ModalStyles['modal__option--email']} 
                  ${ModalStyles['modal__option--enter']}`}
                  onClick={() => {
                    onOpenPreferences();
                  }}
                >
                Увійти
              </button>
            </form>

            <div className={`${ModalStyles.modal__text} ${ModalStyles['modal__isAccount--enter']}`}>
              Вже маєш акаунт?&nbsp;
              <button
                className={ModalStyles.modal__letsRegistrait}
                type="button"
                onClick={() => {
                  onRegistrait();
                }}>
                Увійти
              </button>
            </div>

            <div className={`${ModalStyles.modal__text} ${ModalStyles.modal__footer}`}>
              <span className={ModalStyles.modal__footerQuestion}>Під час реєстрації ви приймаєте</span>
              &nbsp;

              <button className={ModalStyles.modal__letsRegistrait}>Умови використання</button>

              <span>, </span>

              <div className={ModalStyles['modal__footer--level']}>
                <button className={`${ModalStyles.modal__letsRegistrait} ${ModalStyles['modal__letsRegistrait--2']}`}>Політику конфіденційності</button>
                <span>&nbsp;та&nbsp;</span>
                <button className={`${ModalStyles.modal__letsRegistrait} ${ModalStyles['modal__letsRegistrait--3']}`}>Політику щодо файлів cookie.</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalLayout;
