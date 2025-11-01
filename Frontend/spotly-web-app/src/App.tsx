import { useEffect } from 'react'
import './App.css'
import Modal from './Modal/Modal';
import useModal from './Modal/useModal';
import ModalPreferences from './ModalPreferences/ModalPreferences';
import { useNavigate } from 'react-router-dom';
// import Header from './Header';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Спроба отримати токен при завантаженні застосунку
    const token = localStorage.getItem('authToken');

    if (token) {
      // 2. Якщо токен знайдено:
      // А. Можливо, виконати перевірку його валідності на сервері
      //    (Це ідеально, але опціонально на першому етапі).

      // Б. Встановити стан аутентифікації в React Context (див. нижче).

      // В. Перенаправити користувача, якщо він намагається потрапити на /login чи /register
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        navigate('/events'); // Наприклад, на головну сторінку для авторизованих
      }

    } else {
      // 3. Якщо токен НЕ знайдено (користувач не залогінився):
      // Переконатися, що він не може отримати доступ до захищених сторінок.
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        navigate('/login');
      }
    }
  }, [navigate]);

  const modalProps = useModal();

  // const onOpen = modalProps.onOpen;
  const onClosePreferences = modalProps.onClosePreferences;
  const isOpenPreferences = modalProps.isModalPreferences;

  return (
    <>
      {/* <Header
        modalProps={modalProps}
        onOpen={onOpen}
        onClosePreferences={onClosePreferences}
        isOpenPreferences={isOpenPreferences}
      /> */}

      <Modal {...modalProps} />

      {isOpenPreferences && <ModalPreferences onClosePreferences={onClosePreferences} />}
    </>
  );
};

export default App;
