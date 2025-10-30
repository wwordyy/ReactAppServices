
export async function getUserOrders(userID) {
     const response = await fetch(`http://localhost:3001/api/users/${userID}/orders`, {
        method: 'GET',
    });

    if (!response.ok)
    {
        throw new Error("Не удалось получить данные!");
    }
    return await response.json();
}
