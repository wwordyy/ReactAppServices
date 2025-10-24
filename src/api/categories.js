const API_CATEGORIES_URL = 'http://localhost:3001/api/categories';

export async function getCategories() {
    const response = await fetch(API_CATEGORIES_URL, {
        method: 'GET',
    });

    if (!response.ok)
    {
        throw new Error("Не удалось получить данные!");
    }
    return await response.json();
    
}


export async function postCategories(data) {
    const response = await fetch(API_CATEGORIES_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok)
    {
        const errData = await response.json();
        throw new Error(errData.err || "Ошибка сервера")
    }
    return await response.json()
    
}
