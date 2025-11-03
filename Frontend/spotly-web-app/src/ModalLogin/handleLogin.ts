import useLogin from "./useLogin";
import useValidate from "../ModalRegistrait/useValidate";

type Props = {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
  regEmail: string;
  setEmailError: React.Dispatch<React.SetStateAction<string | null>>;
  regPassword: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  surname: string;
  e: React.FormEvent<Element>;
  setDescriptionErrorPass: React.Dispatch<React.SetStateAction<string>>;
  setNameError: React.Dispatch<React.SetStateAction<string | null>>;
  setSurnameError: React.Dispatch<React.SetStateAction<string | null>>;
  onClose: () => void;
  onOpenPreferences: () => void;
}

const handleLogin = async ({
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
}: Props) => {
  e.preventDefault();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isValidate = useValidate(
    {
      name,
      regEmail,
      setEmailError,
      regPassword,
      setDescriptionErrorPass,
      setNameError,
      surname,
      setSurnameError,
    }
  );

  console.log('функція handleRegistration запущена.');

  if (!isValidate) {
    return;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLogin({ 
    setError, 
    name, 
    regEmail, 
    regPassword, 
    setIsLoading, 
    surname, 
    e, 
    onOpenPreferences, 
    onClose
  });
}

export default handleLogin;
