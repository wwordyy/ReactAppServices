const API_REGISTER_URL = 'http://localhost:3001/api/register';
const API_LOGIN_URL = 'http://localhost:3001/api/login';


export async function postRegister(data) {
    const response = await fetch(API_REGISTER_URL, {
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


export async function postLogin(data) {
    
     const response = await fetch(API_LOGIN_URL, {
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