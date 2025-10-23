// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Modal from './Modal/Modal';
import useModal from './Modal/useModal';

function App() {
  // const [count, setCount] = useState(0);
  // const requires = fetch('elastic-loadbalancer.mylabstep.com');

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

  return (
    <>
      <button className='topBar__log-up' onClick={onOpen}>Sign up</button>

      <Modal {...modalProps} />
    </>
  )
}

export default App;
