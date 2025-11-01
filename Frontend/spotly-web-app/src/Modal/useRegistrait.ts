import React from "react";

type Props = {
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  name: string;
  regEmail: string;
  regPassword: string;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  surname: string;
  e: React.FormEvent<Element>
}

const useRegistrait = ({ setError, name, regEmail, regPassword, setIsLoading, surname, e }: Props) => {
  console.log('фугкція useRegistrait спрацювала');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 💡 2. Валідація буде тут
    if (!name || !regEmail || regPassword.length < 10) {
      setError("Будь ласка, заповніть усі поля коректно.");
      return;
    }

    // 💡 3. Надсилання даних
    await sendRegistrationData();
  };

  const BASE_URL = 'http://10.0.1.252:8080/api';
  const API_URL = `${BASE_URL}/users/register`; // 👈 Ваша кінцева точка реєстрації

  const sendRegistrationData = async () => {
    setIsLoading(true);
    const userData = { name, surname, regEmail, regPassword };

    try {
      console.log('Реєстрація успішна:');

      const response = await fetch(API_URL, {
        method: 'POST', // Обов'язково використовуйте POST для створення ресурсу
        headers: {
          'Content-Type': 'application/json', // Обов'язковий заголовок
        },
        body: JSON.stringify(userData), // Конвертуємо об'єкт у JSON-рядок
      });

      console.log(response);

      // 💡 4. Обробка відповіді
      if (!response.ok) {
        // Якщо сервер повернув помилку 4xx або 5xx
        const errorData = await response.json();
        throw new Error(errorData.message || 'Помилка реєстрації на сервері.');
      }

      // Успішна реєстрація (сервер повертає 201 Created або 200 OK)
      const data = await response.json();

      // Зберігаємо токен (якщо є) і закриваємо модальне вікно

      if (data.token) {

        localStorage.setItem('authToken', data.token);
      }

    } catch (err) {
      // Обробка помилок мережі або помилок, викинутих з блоку if (!response.ok)
      const message = err instanceof Error ? err.message : 'Невідома помилка мережі.';
      setError(message);
      console.log(message);

    } finally {
      setIsLoading(false);
    }
  };

  return handleSubmit(e);
};

export default useRegistrait;
