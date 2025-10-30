
const pool = require('../config/db');



// ! GET  получение userID по OrderID
exports.getUserIdByOrderId = async(req, res) => {

    console.log("GET запрос на получение закааза по ID");

    const orderId = req.params.orderID;

    try{
        const data = await pool.query('SELECT * FROM Orders WHERE ID_order = $1', 
            [orderId]);


        if (data.rows.length == 0)
        {
            console.log("Данные не найдены")
            return res.status(404).json({
                err: "Данные не найдены"
            })
        }

        return res.status(200).json({
            userId: data.rows[0].user_id
        })
    } catch (err) {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }



}


//! PUT - Обновление заказа
exports.putOrder = async (req, res) => {

    try{
        

        console.log('PUT - Обновление стоимости заказа')
        const { dateOfDelivery, address, orderID, sum} = req.body

        if (!orderID && !sum )
        {
            return res.status(400).json({err: "Не правильно переданы аргументы!"})
        }

        const responseFromDb = await pool.query(
        'UPDATE Orders SET total_sum = $1, date_of_delivery = $2, address = $3, status_ID = $4 WHERE ID_order = $5 RETURNING user_ID',
        [sum, dateOfDelivery, address, 2, orderID]
        );

        // status 2 - это заказ оплачен

        if (responseFromDb.rows.length == 0)
        {
            return res.status(404).json({err: "Заказ не найден"})
        }

        
        console.log('[200] Стоимость заказа обновлена!')
        return res.status(200).json({
            userID: responseFromDb.rows[0].user_id
        })
    } catch(err)
    {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }
}



//! POST - создание пустого заказа
exports.createOrder = async(req, res) => {
    const {userID} = req.body

    try{

           console.log('POST - Создание заказа')
        if (!userID)
        {
            return res.status(400).json({err: "Не правильно переданы аргументы!"})
        }

        
    const order = await pool.query('INSERT INTO orders (total_sum, order_date, address, date_of_delivery, user_ID, status_ID) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ID_order',
                [0, new Date(), null, null, userID, 1]
    );

    // status 1 - заказ создан

        console.log('[201] - Заказ создан')
        res.status(201).json({ 
            orderID: order.rows[0].id_order
        })
    } catch (err) {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }


}



exports.getOrdersByUserId = async(req, res) => {
        
    console.log("GET запрос на получение закаазов по ID");

    const orderId = req.params.orderID;

    try{
        const data = await pool.query('SELECT * FROM Orders WHERE ID_order = $1', 
            [orderId]);


        if (data.rows.length == 0)
        {
            console.log("Данные не найдены")
            return res.status(404).json({
                err: "Данные не найдены"
            })
        }

        return res.status(200).json({
            orders: data.rows.map(order => ({
                ID_order: order.id_order,
                total_sum: order.total_sum,
                order_date: order.order_date,
                address: order.address,
                date_of_delivery: order.date_of_delivery,
                user_ID: order.user_id,
                status_ID: order.status_id
            }))
        });

    } catch (err) {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }
}


//! ADMIN ENDPOIINTS




exports.createAdminOrder = async (req, res) => {

  const { total_sum, order_date, address, date_of_delivery, user_ID, status_ID } = req.body;
  try {

    const order = await pool.query(
      'INSERT INTO Orders (total_sum, order_date, address, date_of_delivery, user_ID, status_ID) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [total_sum, order_date, address, date_of_delivery, user_ID, status_ID]
    );


    return res.status(201).json({ order: order.rows[0] });

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};

exports.updateAdminOrder = async (req, res) => {


  const id = req.params.orderID;
  const { total_sum, order_date, address, date_of_delivery, user_ID, status_ID } = req.body;


  try {
    const result = await pool.query(
      'UPDATE Orders SET total_sum = $1, order_date = $2, address = $3, date_of_delivery = $4, user_ID = $5, status_ID = $6 WHERE ID_order = $7 RETURNING *',
      [total_sum, order_date, address, date_of_delivery, user_ID, status_ID, id]
    );


    if (result.rows.length === 0) {
      return res.status(404).json({ err: "Заказ не найден" });
    }


    return res.status(200).json({ order: result.rows[0] });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};

exports.deleteAdminOrder = async (req, res) => {


  const id = req.params.orderID;

  try {
    const result = await pool.query(
      'DELETE FROM Orders WHERE ID_order = $1',
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Заказ не найден" });
    }

    return res.status(200).json({});

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};