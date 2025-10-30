
const pool = require('../config/db');


// ! Получение данных пользователя и всех его заказов 
exports.getUserOrderData = async(req, res) => {


    console.log("[GET] Получение данных пользователя и всех его заказов ")
    try{
    const userID = req.params.userID;

        
    if (!userID || isNaN(Number(userID))) {
      return res.status(400).json({ err: "Неверный параметр userID" });
    }

    const data = await pool.query(
        'SELECT * FROM Users INNER JOIN Orders ON Users.ID_user = Orders.user_ID WHERE ID_user = $1', 
        [userID]
    );

    if (data.rows.length == 0) {
        console.log("Данные не найдены")
            return res.status(404).json({
                err: "Данные не найдены"
            })
    }

     const user = {
      ID_user: data.rows[0].id_user,
      first_name: data.rows[0].first_name,
      last_name: data.rows[0].last_name,
      middle_name: data.rows[0].middle_name,
      phone: data.rows[0].phone,
      user_email: data.rows[0].user_email,
      role_ID: data.rows[0].role_id,
    };

    const orders = data.rows
      .filter(row => row.id_order !== null)
      .map(row => ({
        ID_order: row.id_order,
        total_sum: row.total_sum,
        order_date: row.order_date,
        address: row.address,
        date_of_delivery: row.date_of_delivery,
      }));


    return res.json({ user, orders });

    } catch(err) {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });

    }
}