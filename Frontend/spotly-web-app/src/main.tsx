import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { Root } from './Root.tsx'
import App from './App.tsx';

console.log('jirofjrofjrof');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
