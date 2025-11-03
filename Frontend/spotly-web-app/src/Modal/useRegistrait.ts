import React from "react";

type Props = {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
  regEmail: string;
  regPassword: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  surname: string;
  e: React.FormEvent<Element>
  onOpenPreferences: () => void;
  onClose: () => void;
}

const useRegistrait = ({ setError, name, regEmail, regPassword, setIsLoading, surname, e, onOpenPreferences, onClose }: Props) => {
  console.log('функція useRegistrait спрацювала');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !regEmail || regPassword.length < 10) {
      setError("Будь ласка, заповніть усі поля коректно.");
      return;
    }

    const registrationData = await sendRegistrationData();

    if (registrationData) {
      onOpenPreferences();
      onClose();
    }
  };

  const BASE_URL = 'http://10.0.1.252:8080/api';
  const API_URL = `${BASE_URL}/users/register`;

  const sendRegistrationData = async () => {
    setIsLoading(true);
    const userData = { name, surname, regEmail, regPassword };

    try {
      console.log('Запит надіслано: чекаємо не відповідь сервера.');

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log(response);

      if (!response.ok) {
        console.log('Якщо ви бачите це повідомлення то !response.ok');
        throw new Error(`Помилка HTTP! статус: ${response.status}`);
      }

      const data = await response.json();

      console.log('якщо ви це бачите реєстрація пройшоа успішно', data);

      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Невідома помилка мережі.';
      setError(message);
      console.log(err);

    } finally {
      setIsLoading(false);
    }
  };

  return handleSubmit(e);
};

export default useRegistrait;
