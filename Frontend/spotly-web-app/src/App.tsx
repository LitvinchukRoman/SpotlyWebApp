import { useEffect } from 'react'
import './App.css'
import Modal from './Modal/Modal';
import useModal from './Modal/useModal';
import ModalPreferences from './ModalPreferences/ModalPreferences';
import { useNavigate } from 'react-router-dom';
import HeaderTop from './HeaderTop/HeaderTop';
import PopularsEvents from './PopularsEvents/PopularsEvents';
import './App.css';
import HowSpotlyWorks from './HowSpotlyWorks/HowSpotlyWorks';
import JoinToUs from './JoinToUs/JoinToUs';
import Footer from './Footer/Footer';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        navigate('/events');
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
      <div className="App">
        <HeaderTop
          modalProps={modalProps}
          onOpen={onOpen}
          onClosePreferences={onClosePreferences}
          isOpenPreferences={isOpenPreferences}
        />

        <Modal {...modalProps} />
        {isOpenPreferences && <ModalPreferences onClosePreferences={onClosePreferences} />}

        <PopularsEvents />
        <HowSpotlyWorks />
        <JoinToUs onOpen={onOpen} />
        <Footer />
      </div>
    </>
  );
};

export default App;
