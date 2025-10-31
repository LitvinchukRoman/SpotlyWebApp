// const BASE_URL = 'http://localhost:8080'; 

// ---------------------------------------------------------
// ДОПОМІЖНА ФУНКЦІЯ (Core Fetcher)
// ---------------------------------------------------------
const apiFetcher = async ( options: RequestInit) => {
    const url = '/api/users/register';
    const response = await fetch(url, options);

    // Обробка HTTP-помилок (4xx, 5xx)
    if (!response.ok) {
        // Намагаємося отримати детальне повідомлення про помилку від бекенду
        const errorData = await response.json(); 
        throw new Error(errorData.message || `Помилка: ${response.status}`);
    }

    return response.json(); // Повертає JSON-результат
};

export default apiFetcher;