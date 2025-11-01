import { useState, type FC, type PropsWithChildren, useRef } from 'react';
import type { ModalProps } from '../resuable/types';
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
            onOpenPreferences={onOpenPreferences}
          />
        ) : (
            <ModalRegistrait
              isOpenEye={isOpenEye}
              onOpenEye={onOpenEye}
              onRegistrait={onRegistrait}
              onClose={onClose}
              // handleSubmit={handleSubmit}
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
