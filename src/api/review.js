
const API_URL_REVIEW = 'http://localhost:3001/api/reviews'


export async function getAllReviews() {
    const response = await fetch(API_URL_REVIEW, {
        method: 'GET',
    });

    if (!response.ok)
    {
        throw new Error("Не удалось получить данные!");
    }
    return await response.json();
    
}

export async function createReview(data) {
    const response = await fetch(API_URL_REVIEW, {
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

export async function updateReview(id, data) {
    
  const response = await fetch(`${API_URL_REVIEW}/${id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.err || "Ошибка сервера");
  }


  return await response.json();
}



export async function deleteReview(id) {

  const response = await fetch(`${API_URL_REVIEW}/${id}`, {
    method: 'DELETE'
  });


  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.err || "Ошибка сервера");
  }
  
  return await response.json();
}

