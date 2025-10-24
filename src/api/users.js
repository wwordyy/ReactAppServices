const API_USERS =  'http://localhost:3001/api/users';

export async function getAllUsers() {
     const response = await fetch(API_USERS, {
        method: 'GET',
    });

    if (!response.ok)
    {
        throw new Error("Не удалось получить данные!");
    }
    return await response.json();
}
