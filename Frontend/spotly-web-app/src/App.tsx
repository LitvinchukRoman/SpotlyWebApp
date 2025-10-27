// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import { useState } from 'react';
import './App.css'
import Modal from './Modal/Modal';
import useModal from './Modal/useModal';
import ModalPreferences from './ModalPreferences/ModalPreferences';

function App() {
  // const [count, setCount] = useState(0);
  // const [isOpen, setIsOpen] = useState(false);

  // requires
  //   .then(respons => respons.json)
  //   .then(text => {
  //     console.log(text);

  //     return text
  //   })
  //   .catch(error => {
  //     throw error;
  //   });

  const modalProps = useModal();

  const onOpen = modalProps.onOpen;
  const onClosePreferences = modalProps.onClosePreferences;
  const isOpenPreferences = modalProps.isModalPreferences;


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%' }}>
        <button className='topBar__log-up' onClick={() => {
          onOpen();
        }}>
          Sign up
        </button>
      </div>

      <Modal {...modalProps} />

      {isOpenPreferences && <ModalPreferences onClosePreferences={onClosePreferences} />}
    </>
  )
}

export default App;
