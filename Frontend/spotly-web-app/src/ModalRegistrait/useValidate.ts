import validator from 'validator';

type Props = {
  name: string
  regEmail: string;
  setEmailError: React.Dispatch<React.SetStateAction<string | null>>;
  regPassword: string;
  setDescriptionErrorPass: React.Dispatch<React.SetStateAction<string>>;
  setNameError: React.Dispatch<React.SetStateAction<string | null>>;
  surname: string;
  setSurnameError: React.Dispatch<React.SetStateAction<string | null>>;
};

const useValidate = ({
  name,
  regEmail,
  setEmailError,
  regPassword,
  setDescriptionErrorPass,
  setNameError,
  surname,
  setSurnameError,
}: Props) => {
  const validEmail = (email: string, setEmailError: (value: React.SetStateAction<string | null>) => void): boolean => {
    const isEmailValid = validator.isEmail(email);

    if (regEmail.length === 0) {
      setEmailError('Поле має бути заповнене');
    } else if (!isEmailValid) {
      setEmailError(`Невалідний email введено: ${email}. Будь ласка, введіть дійсну адресу у форматі: name@example.com.`);
    } else {
      setEmailError(null);
    }

    return isEmailValid;
  };

  const onValidate = () => {
    let error = false;

    const isValidEmail = validEmail(regEmail, setEmailError);
    const hasNumber = /[0-9]/.test(regPassword);
    const hasUpperCase = /\p{Lu}/u.test(regPassword);
    const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?+]/.test(regPassword);

    const errorText = 'Це поле заповнено не вірно. Мінімум 10 символів, велика літера, цифра й один із цих символів: !@#$%^&*()_+-=[]{};:"\\|,.<>/?';

    error = !isValidEmail;

    if (!hasNumber) {
      error = true;

      setDescriptionErrorPass(errorText);
    } else if (!hasUpperCase) {
      error = true;

      setDescriptionErrorPass(errorText);
    } else if (!hasSpecialChar) {
      error = true;

      setDescriptionErrorPass(errorText);
    } else if (regPassword.length === 0) {
      error = true;

      setDescriptionErrorPass(errorText);
    } else {
      setDescriptionErrorPass('Це поле заповнене добре!');
    }

    if (name.length === 0) {
      error = true;

      setNameError('Поле має бути заповнене');
    } else {
      setNameError(null);
    }

    if (surname.length === 0) {
      error = true;

      setSurnameError('Поле має бути заповнене');
    } else {
      setSurnameError(null);
    }

    console.log(`${error} -- error`);

    if (error) {
      
      return false;
    }

    console.log(true);
    return true;
  };

  return onValidate();
};

export default useValidate;
