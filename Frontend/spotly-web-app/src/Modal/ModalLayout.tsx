import { useState, type FC, type PropsWithChildren, useRef } from 'react';
import type { ModalProps } from './useModal';
import ModalStyles from './Modal.module.scss'
import ModalLogin from '../ModalLogin/ModalLogin';
import ModalRegistrait from '../ModalRegistrait/ModalRegistrait';

type ModalLayoutProps = PropsWithChildren<ModalProps>;

const ModalLayout: FC<ModalLayoutProps> = ({ onClose, visible, onOpenPreferences }) => {
  const [enterAccount, setEnterAccount] = useState<boolean>(false);
  const [registrait, setRegistrait] = useState(false);
  const [isOpenEye, setIsOpenEye] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(loginEmail);
  console.log(loginPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 💡 2. Валідація буде тут
    if (!name || !regEmail || regPassword.length < 10) {
      setError("Будь ласка, заповніть усі поля коректно.");
      return;
    }

    // 💡 3. Надсилання даних
    await sendRegistrationData();
  };

  const API_URL = 'https://yourdomain.com/api/register'; // 👈 Ваша кінцева точка реєстрації

  const sendRegistrationData = async () => {
    setIsLoading(true);
    const userData = { name, surname, regEmail, regPassword };

    try {
      const response = await fetch(API_URL, {
        method: 'POST', // Обов'язково використовуйте POST для створення ресурсу
        headers: {
          'Content-Type': 'application/json', // Обов'язковий заголовок
        },
        body: JSON.stringify(userData), // Конвертуємо об'єкт у JSON-рядок
      });

      // 💡 4. Обробка відповіді
      if (!response.ok) {
        // Якщо сервер повернув помилку 4xx або 5xx
        const errorData = await response.json();
        throw new Error(errorData.message || 'Помилка реєстрації на сервері.');
      }

      // Успішна реєстрація (сервер повертає 201 Created або 200 OK)
      const data = await response.json();

      // Зберігаємо токен (якщо є) і закриваємо модальне вікно
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      // onClose(); 
      console.log('Реєстрація успішна:', data);

    } catch (err) {
      // Обробка помилок мережі або помилок, викинутих з блоку if (!response.ok)
      const message = err instanceof Error ? err.message : 'Невідома помилка мережі.';
      setError(message);

    } finally {
      setIsLoading(false);
    }
  };

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
          <ModalLogin 
            enterAccount={enterAccount} 
            isOpenEye={isOpenEye} 
            onOpenEye={onOpenEye}
            onRegistrait={onRegistrait}
            handleScrollToTop={handleScrollToTop}
            onClose={onClose}
            onEnter={onEnter}

            setLoginEmail={setLoginEmail}
            loginEmail={loginEmail}
            setLoginPassword={setLoginPassword}
            loginPassword={loginPassword}
            error={error}
            setError={setError}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) : (
            <ModalRegistrait
              isOpenEye={isOpenEye}
              onOpenEye={onOpenEye}
              onRegistrait={onRegistrait}
              onClose={onClose}
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              setSurname={setSurname}
              surname={surname}
              setRegEmail={setRegEmail}
              regEmail={regEmail}
              setRegPassword={setRegPassword}
              regPassword={regPassword}
              onOpenPreferences={onOpenPreferences}
            />
        )}
      </div>
    </div>
  );
};

export default ModalLayout;
