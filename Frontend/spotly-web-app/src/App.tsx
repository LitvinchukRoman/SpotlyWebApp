import { useEffect } from 'react'
import './App.css'
import Modal from './Modal/Modal';
import useModal from './Modal/useModal';
import ModalPreferences from './ModalPreferences/ModalPreferences';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        navigate('/events'); // Наприклад, на головну сторінку для авторизованих
      }

    } else {
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        navigate('/login');
      }
    }
  }, [navigate]);

  const modalProps = useModal();

  const onOpen = modalProps.onOpen;
  const onClosePreferences = modalProps.onClosePreferences;
  const isOpenPreferences = modalProps.isModalPreferences;

  return (
    <>
      <Header
        modalProps={modalProps}
        onOpen={onOpen}
        onClosePreferences={onClosePreferences}
        isOpenPreferences={isOpenPreferences}
      />

      <Modal {...modalProps} />

      {isOpenPreferences && <ModalPreferences onClosePreferences={onClosePreferences} />}
    </>
  );
};

export default App;
