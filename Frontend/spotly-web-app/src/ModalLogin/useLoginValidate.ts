// import validator from 'validator';

// type Props = {
//   loginEmail: string;
//   loginPassword: string;
//   setError: React.Dispatch<React.SetStateAction<string | null>>;
//   emailError: string | null;
//   setEmailError: React.Dispatch<React.SetStateAction<string | null>>;
//   passwordError: string | null;
//   setPasswordError: React.Dispatch<React.SetStateAction<string | null>>;
// }

// const useLoginValidate = ({ loginEmail, loginPassword, setError, emailError, setEmailError, passwordError, setPasswordError }: Props) => {
//   const validEmail = (email: string, setEmailError: (value: React.SetStateAction<string | null>) => void): boolean => {
//       const isEmailValid = validator.isEmail(email);
  
//       if (loginEmail.length === 0) {
//         setEmailError('Поле має бути заповнене');
//       } else if (!isEmailValid) {
//         setEmailError(`Невалідний email введено: ${email}. Будь ласка, введіть дійсну адресу у форматі: name@example.com.`);
//       } else {
//         setEmailError(null);
//       }
  
//       return isEmailValid;
//   };

//   // const onValidate = () => {
//   //   const isValidEmail = validEmail(loginEmail, setEmailError);

//   // }
// };

// export default useLoginValidate;
