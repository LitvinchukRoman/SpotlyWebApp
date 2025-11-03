import useLogin from "./useLogin";

type Props = {
  loginEmail: string;
  loginPassword: string;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  e: React.FormEvent<Element>;
  onClose: () => void;
  onOpenPreferences: () => void;

  // emailError: string | null;
  // setEmailError: React.Dispatch<React.SetStateAction<string | null>>;
  // passwordError: string | null;
  // setPasswordError: React.Dispatch<React.SetStateAction<string | null>>;
  // setDescriptionErrorPass: React.Dispatch<React.SetStateAction<string>>;
  // setNameError: React.Dispatch<React.SetStateAction<string | null>>;
  // setSurnameError: React.Dispatch<React.SetStateAction<string | null>>;
}

const handleLogin = async ({
  // emailError,
  // setEmailError,
  // passwordError,
  // setPasswordError,
  loginEmail,
  loginPassword,
  setError,
  setIsLoading,
  e,
  onClose,
  onOpenPreferences,
}: Props) => {
  e.preventDefault();

  // const isValidate = useLoginValidate(
  //   {
  //     loginEmail,
  //     loginPassword,
  //     setError,
  //     emailError,
  //     setEmailError,
  //     passwordError,
  //     setPasswordError
  //   }
  // );

  console.log('функція handleRegistration запущена.');

  // if (!isValidate) {
  //   return;
  // }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLogin({ 
    loginEmail,
    loginPassword,
    e, 
    setIsLoading,
    onOpenPreferences, 
    setError,
    onClose
  });
}

export default handleLogin;
