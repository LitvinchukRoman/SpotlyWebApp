import { useState } from 'react';
import ModalStyles from './ModalLogin.module.scss';
import cn from 'classnames';
import BlackRedEye from '../BlackRedEye/BlackRedEye';

type Props = {
  enterAccount: boolean;
  isOpenEye: boolean;
  onOpenEye: () => void;
  onRegistrait: () => void;
  handleScrollToTop: () => void;
  onClose: () => void;
  onEnter: () => void;

  loginEmail: string;
  setLoginEmail: (value: React.SetStateAction<string>) => void;
  loginPassword: string;
  setLoginPassword: (value: React.SetStateAction<string>) => void;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenPreferences: () => void;
}

const ModalLogin: React.FC<Props> = ({
  enterAccount,
  isOpenEye,
  onOpenEye,
  onRegistrait,
  handleScrollToTop,
  onClose,
  onEnter,
  loginEmail,
  setLoginEmail,
  loginPassword,
  setLoginPassword,
  onOpenPreferences,
}) => {
  const [emailError, setEmailError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);

  const onValidate = () => {
    let error = false;

    if (loginEmail.length === 0) {
      error = true;
      setEmailError('Поле має бути заповнене');
    } else {
      error = false;
    }

    if (loginPassword.length === 0) {
      error = true;
      setPasswordError('Поле має бути заповнене');
    } else {
      error = false;
    }

    if (error) {
      return;
    }

    onOpenPreferences();
    onClose();
  };

  return (
    <>
      <button className={ModalStyles.modal__iconButton} onClick={onClose}>
        <div className={ModalStyles.modal__icon} />
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
            src="./images/icons/Google.svg"
            alt="google"
            className={ModalStyles['modal__option--icon']}
          />
          Продовжити з Google
        </button>

        <button className={ModalStyles.modal__option}>
          <img
            src="./images/icons/Apple.svg"
            alt="apple"
            className={ModalStyles['modal__option--icon']}
          />
          Продовжити з Apple
        </button>

        <button className={ModalStyles.modal__option}>
          <img
            src="./images/icons/Facebook.svg"
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
            <button
              className={`
                    ${ModalStyles.modal__option} 
                    ${ModalStyles['modal__option--email']}`
              }
              onClick={() => {
                onRegistrait();
                handleScrollToTop();
              }}>
              Зареєструватися через email
            </button>
          </div>

          <div className={`${ModalStyles.modal__text} ${ModalStyles.modal__isAccount}`}>
            Вже маєш акаунт?&nbsp;
            <button className={ModalStyles.modal__letsLogin} onClick={onEnter}>
              Увійти

              <img
                src="./images/icons/arrow-right-01-sharp.svg"
                alt="continue"
                className={ModalStyles.modal__right}
              />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <form action="post" className={ModalStyles.modal__login}>
            <label className={ModalStyles.modal__inputWrapper}>
              Email
              <div className={ModalStyles.modal__toggleIconWrapper}>
                <input
                  className={cn(ModalStyles.modal__input, {
                    [ModalStyles['modal__input--error']]:
                      emailError,
                  })}
                  type="email"
                  placeholder='Введи email'
                  name='email'
                  onChange={(e) => setLoginEmail(e.currentTarget.value)}
                />

                <span className={ModalStyles.modal__passwordToggleIcon}>
                  {emailError && (
                    <img
                      src="./images/Alert-red.svg"
                      alt="red eye"
                    />
                  )}
                </span>
              </div>
              <div className={cn(ModalStyles.modal__hintEmail, {
                [ModalStyles['modal__hintEmail--active']]:
                  emailError
              })}>
                {emailError}
              </div>
            </label>

            <label className={cn(ModalStyles['modal__inputWrapper--second'], ModalStyles.modal__inputWrapper)}>
              Пароль
              <div className={ModalStyles.modal__toggleIconWrapper}>
                <input
                  type={isOpenEye ? 'text' : 'password'}
                  className={cn(ModalStyles.modal__input, {
                    [ModalStyles['modal__input--error']]:
                      emailError,
                  })}
                  placeholder='Введи пароль'
                  name='passord'
                  onChange={(e) => setLoginPassword(e.currentTarget.value)}
                />

                <span className={ModalStyles.modal__passwordToggleIcon}>
                  <BlackRedEye
                    isOpenEye={isOpenEye}
                    onOpenEye={onOpenEye}
                    isError={!!passwordError}
                  />
                </span>
              </div>
              <div className={cn(ModalStyles.modal__hintPassword, {
                [ModalStyles['modal__hintPassword--active']]:
                  passwordError
              })}>Поле має бути заповнене</div>
            </label>

            <button
              className={`
                ${ModalStyles.modal__option}
                ${ModalStyles['modal__option--email']}
              `}
              type="button"
              onClick={onValidate}
            >
              Увійти
            </button>
          </form>

          <div className={`${ModalStyles.modal__text} ${ModalStyles['modal__text--question']}`}>Забув пароль?
          </div>

          <div className={`${ModalStyles.modal__text} ${ModalStyles.modal__isAccount}`}>
            Ще не маєш акаунту?&nbsp;
            <button
              className={ModalStyles.modal__letsRegistrait}
              onClick={() => {
                onRegistrait();
                handleScrollToTop();
              }}>
              Зареєструватися
              <img
                src="./images/icons/arrow-right-01-sharp.svg"
                alt="continue"
                className={ModalStyles.modal__right}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalLogin;
