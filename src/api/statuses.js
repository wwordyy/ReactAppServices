const HOST = 'http://localhost:3001';
const API_STATUSES_URL = `${HOST}/api/statuses`;


export async function createStatus(data) {

  const response = await fetch(API_STATUSES_URL, {
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


export async function updateStatus(id, data) {

  const response = await fetch(`${API_STATUSES_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.err || "Ошибка сервера");
  }

  return await response.json();
}

export async function deleteStatus(id) {
    
  const response = await fetch(`${API_STATUSES_URL}/${id}`, {
    method: 'DELETE',
  });


  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.err || "Ошибка сервера");
  }


  return await response.json();
}
