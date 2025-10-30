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


export async function getUserById(userID) {
     const response = await fetch(`http://localhost:3001/api/users/${userID}`, {
        method: 'GET',
    });

    if (!response.ok)
    {
        throw new Error("Не удалось получить данные!");
    }
    return await response.json();
}



export async function  putUser(data, userID) {
    
    const response = await fetch(`http://localhost:3001/api/users/${userID}`, {
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



export async function createUser(data) {

  const response = await fetch(API_USERS, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.err || "Ошибка сервера");
  }


  return await response.json();
}

export async function deleteUser(userID) {
    
  const response = await fetch(`${API_USERS}/${userID}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.err || "Ошибка сервера");
  }

  
  return await response.json();
}

