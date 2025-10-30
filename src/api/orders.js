const API_ORDERS_URL = 'http://localhost:3001/api/orders';
const API_ADMIN_ORDERS_URL = 'http://localhost:3001/api/admin/orders';


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


export async function  putServiceCountInOrder(data, orderID, serviceID) {
    
    const response = await fetch(`http://localhost:3001/api/orders/${orderID}/services/${serviceID}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (!response.ok)
    {
        const errData = await response.json();
        throw new Error(errData.err || "Ошибка сервера")
    }

    return await response.json()



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



//! ADMIN API

export async function createAdminOrder(data) {
        
      const response = await fetch(API_ADMIN_ORDERS_URL, {
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

export async function updateAdminOrder(orderId, data) {

      const response = await fetch(API_ADMIN_ORDERS_URL + `/${orderId}`, {
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
    return await response.json()
    
    
}

export async function deleteAdminOrder(orderID) {

    const response = await fetch(API_ADMIN_ORDERS_URL + `/${orderID}`, {
        method: 'DELETE',
    });

    if (!response.ok)
    {
        const errData = await response.json();
        throw new Error(errData.err || "Ошибка сервера")
    }
    return await response.json()
    
}