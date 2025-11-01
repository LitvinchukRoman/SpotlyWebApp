import { useState } from 'react';
import ModalStyles from './ModalRegistrait.module.scss';
import cn from 'classnames';
import BlackRedEye from '../BlackRedEye/BlackRedEye';
import handleRegistration from './handleRegistration';
import React from 'react';

type Props = {
  isOpenEye: boolean;
  onOpenEye: () => void;
  onRegistrait: () => void;
  onClose: () => void;
  // handleSubmit: (e: React.FormEvent) => Promise<void>;
  name: string;
  setName: (value: React.SetStateAction<string>) => void;
  surname: string;
  setSurname: (value: React.SetStateAction<string>) => void;
  regEmail: string;
  setRegEmail: (value: React.SetStateAction<string>) => void;
  regPassword: string;
  setRegPassword: (value: React.SetStateAction<string>) => void;
  onOpenPreferences: () => void;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalRegistrait: React.FC<Props> = ({
  isOpenEye,
  onOpenEye,
  onRegistrait,
  onClose,
  name,
  setName,
  surname,
  setSurname,
  setRegEmail,
  regEmail,
  setRegPassword,
  regPassword,
  onOpenPreferences,
  setError,
  setIsLoading,
}) => {
  const mainText = 'Мінімум 10 символів, велика літера, цифра й спецсимвол.';

  const [nameError, setNameError] = useState<null | string>(null);
  const [surnameError, setSurnameError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);
  const [descriptionErrorPass, setDescriptionErrorPass] = useState<string>(mainText);

  // const handleRegistration = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //   const isValidate = useValidate(
  //     {
  //       name,
  //       regEmail,
  //       setEmailError,
  //       regPassword,
  //       setDescriptionErrorPass,
  //       setNameError,
  //       surname,
  //       setSurnameError,
  //       onClose,
  //       onOpenPreferences,
  //     }
  //   );

  //   console.log('функція handleRegistration запущена.')

  //   if (!isValidate) {
  //     return;
  //   }

  //   // eslint-disable-next-line react-hooks/rules-of-hooks
  //     useRegistrait({ setError, name, regEmail, regPassword, setIsLoading, surname, e });
  // }

  return (
    <>
      <div className={ModalStyles.modal__topBar}>
        <button onClick={onRegistrait} className={ModalStyles.modal__iconButton}>
          <div className={ModalStyles.modal__icon} />
        </button>

        <button>
          <div className={ModalStyles.modal__close} onClick={onClose} />
        </button>
      </div>
      <h3 className={ModalStyles.modal__text}>Майже готово!</h3>
      <div className={ModalStyles.modal__text}>Залишилось кілька деталей</div>

      <form
        onSubmit={(e: React.FormEvent) => handleRegistration({
          setError,
          name,
          regEmail,
          setEmailError,
          regPassword,
          setIsLoading,
          surname,
          e,
          setDescriptionErrorPass,
          setNameError,
          setSurnameError,
          onClose,
          onOpenPreferences
        })} className={ModalStyles.modal__login}>
        <label className={ModalStyles.modal__inputWrapper}>
          Ім'я
          <div className={ModalStyles.modal__toggleIconWrapper}>
            <input
              type="text"
              className={cn(ModalStyles.modal__input, {
                [ModalStyles['modal__input--error']]:
                  nameError,
              })}
              placeholder='Введи своє ім’я'
              name='name'
              autoComplete='true'
              onChange={(e) => setName(e.currentTarget.value)}
              value={name}
            />

            <span className={ModalStyles.modal__passwordToggleIcon}>
              {emailError ? (
                <img
                  src="./images/Alert-red.svg"
                  alt="red eye"
                  onClick={onOpenEye}
                />
              ) : (
                <img
                  src="./images/Alert.svg"
                  alt="red eye"
                  onClick={onOpenEye}
                />
              )}
            </span>
          </div>

          <div
            className={cn(ModalStyles.modal__hint, {
              [ModalStyles['modal__hint--active']]:
                nameError
            })}>
            {nameError}
          </div>
        </label>

        <label className={ModalStyles.modal__inputWrapper}>
          Прізвище
          <div className={ModalStyles.modal__toggleIconWrapper}>
            <input
              type="text"
              className={cn(ModalStyles.modal__input, {
                [ModalStyles['modal__input--error']]:
                  surnameError
              })}
              name='surname'
              placeholder='Введи своє прізвище'
              autoComplete='true'
              onChange={(e) => setSurname(e.currentTarget.value)}
              value={surname}
            />

            <span className={ModalStyles.modal__passwordToggleIcon}>
              {emailError ? (
                <img
                  src="./images/Alert-red.svg"
                  alt="red eye"
                  onClick={onOpenEye}
                />
              ) : (
                <img
                  src="./images/Alert.svg"
                  alt="red eye"
                  onClick={onOpenEye}
                />
              )}
            </span>
          </div>

          <div
            className={cn(ModalStyles.modal__hint, {
              [ModalStyles['modal__hint--active']]:
                surnameError
            })}>
            {surnameError}
          </div>
        </label>

        <label className={ModalStyles.modal__inputWrapper}>
          Email

          <div className={ModalStyles.modal__toggleIconWrapper}>
            <input
              type="email"
              className={cn(ModalStyles.modal__input, {
                [ModalStyles['modal__input--error']]:
                  emailError
              })}
              name='email'
              placeholder='Введи email'
              autoComplete='true'
              onChange={(e) => setRegEmail(e.currentTarget.value)}
              value={regEmail}
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

          <div
            className={cn(ModalStyles.modal__hint, {
              [ModalStyles['modal__hint--active']]:
                emailError
            })}>
            {emailError}
          </div>
        </label>

        <label className={`${ModalStyles.modal__inputWrapper} ${ModalStyles['modal__inputWrapper--describe']}`}>
          Пароль
          <div className={ModalStyles.modal__toggleIconWrapper}>
            <input
              type={isOpenEye ? 'text' : 'password'}
              className={cn(ModalStyles.modal__input, {
                [ModalStyles['modal__input--error']]:
                  descriptionErrorPass.length > 90,
              })}
              name='passord'
              placeholder='Введи пароль'
              autoComplete='true'
              onChange={(e) => setRegPassword(e.currentTarget.value)}
              value={regPassword}
            />

            <span className={ModalStyles.modal__passwordToggleIcon}>
              <BlackRedEye
                isOpenEye={isOpenEye}
                onOpenEye={onOpenEye}
                isError={descriptionErrorPass.length > 90}
              />
            </span>
          </div>
        </label>

        <div className={cn(ModalStyles.modal__descriptionErrorPass, {
          [ModalStyles['modal__descriptionErrorPass--active']]:
            descriptionErrorPass.length > 90
        })}>
          {descriptionErrorPass}
        </div>

        <button
          type="submit"
          className={`
            ${ModalStyles.modal__option} 
            ${ModalStyles['modal__option--email']} 
            ${ModalStyles['modal__option--enter']}`}
        >
          Зареєструватися
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
  );
};

export default ModalRegistrait;
