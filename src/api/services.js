const HOST = 'http://localhost:3001'
const API_SERVICES_URL = `${HOST}/api/services`;



export async function getAllServices() {
     const response = await fetch(API_SERVICES_URL, {
        method: 'GET',
    });

    if (!response.ok)
    {
        throw new Error("Не удалось получить данные!");
    }
    return await response.json();
}


export async function postAddServiceToOrder(order_ID, service_ID) {
    const response = await fetch(`${HOST}/api/orders/${order_ID}/services/${service_ID}`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok)
    {
        throw new Error("Не удалось добавить услугу в заказ");
    }

    return await response.json();
    
}


export async function getServicesFromOrder(order_ID) {
    const response = await fetch(`${HOST}/api/orders/${order_ID}/services`, {
        method: 'GET',
    });

    if (!response.ok)
    {
        throw new Error("Не удалось получить данные!");
    }
    return await response.json();
}

export async function deleteServiceByIdFromOrder(order_ID, service_ID) {
    const response = await fetch(`${HOST}/api/orders/${order_ID}/services/${service_ID}`, {
    method: 'DELETE',
    headers: {
            'Content-type': 'application/json'
        },
    })

    if (!response.ok)
    {
        throw new Error("Не удалось удалить услугу из заказа");
    }

    return await response.json();
    
}