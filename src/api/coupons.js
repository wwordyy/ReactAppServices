const API_POST_DISCOUNT_URL =  'http://localhost:3001/api/coupons/apply';
const API_POST_COUPONS_URL = 'http://localhost:3001/api/coupons';



export async function postDiscount(data) {
    
    const responseFrom = await getUserIdByOrderId(data.orderID)


    const  info = {
        'coupon_code': data.coupon_code,
        'sum': data.sum,
        'userID': responseFrom.userId
    }

     const response = await fetch(API_POST_DISCOUNT_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(info)
    });

    if (!response.ok)
    {
        const errData = await response.json();
        throw new Error(errData.err || "Ошибка сервера")
    }
    return await response.json()
}


export async function postCoupons(data) {
    const response = await fetch(API_POST_COUPONS_URL, {
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





async function getUserIdByOrderId(orderID) {

        console.log("Order id: " + orderID)

        const API_GET_USER_ID = `http://localhost:3001/api/orders/${orderID}/user`;

        const response = await fetch(API_GET_USER_ID, {
        method: 'GET',
    });

    if (!response.ok)
    {
        throw new Error("Не удалось получить данные!");
    }
    return await response.json();
}
