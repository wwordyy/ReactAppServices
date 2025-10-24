const API_ORDERS_URL = 'http://localhost:3001/api/orders';

export async function putOrder(data) {
    
      const response = await fetch(API_ORDERS_URL, {
        method: 'PUT',
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
    const info =  await response.json()
    

    return await createOrder(info);

}


async function createOrder(data) {
        
      const response = await fetch(API_ORDERS_URL, {
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