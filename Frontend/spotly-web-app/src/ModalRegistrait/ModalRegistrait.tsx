import ModalStyles from './ModalRegistrait.module.scss';

type Props = {
  isOpenEye: boolean;
  onOpenEye: () => void;
  onRegistrait: () => void;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setName: (value: React.SetStateAction<string>) => void;
  setSurname: (value: React.SetStateAction<string>) => void;
  setRegEmail: (value: React.SetStateAction<string>) => void;
  setRegPassword: (value: React.SetStateAction<string>) => void;
  onOpenPreferences: () => void;
}

const ModalRegistrait: React.FC<Props> = ({
  isOpenEye,
  onOpenEye,
  onRegistrait,
  onClose,
  handleSubmit,
  setName,
  setSurname,
  setRegEmail,
  setRegPassword,
  onOpenPreferences,
}) => {
  return (
    <>
      <div className={ModalStyles.modal__topBar}>
        <button onClick={onRegistrait}>
          <img src="./images/icons/arrow-left.svg" alt="back" />
        </button>

        <button>
          <img src="./images/icons/Close.svg" alt="close" onClick={onClose} />
        </button>
      </div>
      <h3 className={ModalStyles.modal__text}>Майже готово!</h3>
      <div className={ModalStyles.modal__text}>Залишилось кілька деталей</div>

      <form onSubmit={handleSubmit} className={ModalStyles.modal__login}>
        <label className={ModalStyles.modal__inputWrapper}>
          Ім'я
          <input
            type="text"
            className={ModalStyles.modal__input}
            placeholder='Введи своє ім’я'
            name='name'
            autoComplete='true'
            onClick={(e) => setName(e.currentTarget.value)}
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
            onClick={(e) => setSurname(e.currentTarget.value)}
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
            onClick={(e) => setRegEmail(e.currentTarget.value)}
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
              onClick={(e) => setRegPassword(e.currentTarget.value)}
            />

            <span className={ModalStyles.modal__passwordToggleIcon}>
              {!isOpenEye ? (
                <img
                  src="./images/icons/eye_closed.svg"
                  alt="eye"
                  onClick={onOpenEye}
                />
              ) : (
                <img
                  src="./images/icons/Eye_opened.svg"
                  alt="eye"
                  onClick={onOpenEye}
                />
              )}
            </span>
          </div>
        </label>
        Мінімум 10 символів, велика літера, цифра й спецсимвол.

        <button
          type="submit"
          className={`
                  ${ModalStyles.modal__option} 
                  ${ModalStyles['modal__option--email']} 
                  ${ModalStyles['modal__option--enter']}`}
          onClick={() => {
            onOpenPreferences();
          }}
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
