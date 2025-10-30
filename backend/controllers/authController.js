const pool = require('../config/db');
const bcrypt = require('bcrypt');



// ! POST - регистрация
exports.register = async (req, res) => {
    
    try{
    console.log("Отправлен запрос на api/register");
        const { firstName, lastName, middleName, phone, email, password} = req.body;


    if (!email || !password || !firstName || !lastName || !middleName || !phone) {
      return res.status(400).json({ err: 'Необходимо указать все данные!' });
    }

    const userExists = await pool.query('SELECT * FROM users WHERE user_email = $1' , [email]);
    if (userExists.rows.length > 0) {
        return res.status(400).json({ err: 'Пользователь с таким email уже существует!'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const register = await pool.query('INSERT INTO users (first_name, last_name, middle_name, phone, user_email, user_password, role_ID) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ID_user', 
        [firstName, lastName, middleName, phone, email, hashedPassword, 1]);
    // 1 - role user
    
        console.log(`USER ID: ${register.rows[0].id_user}`)

    // Создаем Order для пользователя 
    const userID = register.rows[0].id_user;

    const order = await pool.query('INSERT INTO orders (total_sum, order_date, address, date_of_delivery, user_ID, status_ID) VALUES ($1, $2, $3, $4, $5, $6) RETURNING ID_order',
                [0, new Date(), null, null, userID, 1]
    );

    // status 1 - заказ создан;



    res.status(201).json({ 
        orderID: order.rows[0].id_order,
    })

    console.log("ID order: " + order.rows[0].id_order )
} catch (err) {
    console.log("Ошибка регистрации!")
    res.status(500).json({
        err: `Внутреняя ошибка сервера: ${err}` 
    })

}}



//! POST - авторизация
exports.login =  async(req, res) => {

    try{
    console.log("Отправлен запрос на api/login");
    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({ err: 'Email и пароль обязательны' });
    }

    const currentUser = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);

    if (currentUser.rows.length == 0) {
         return res.status(401).json({ err: 'Неверный email или пароль' });
    }

    const userFromDb  = currentUser.rows[0];

    console.log(userFromDb)

     const passwordMatch = await bcrypt.compare(password, userFromDb.user_password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    // Получаем orderId для пользователя
    const order = await pool.query('SELECT * FROM orders WHERE user_ID = $1', [userFromDb.id_user])

    if (order.rows.length == 0) {

        console.log("Не удалось получить order для пользователя!")

        return res.status(500).json( {
            err: 'Ошибка на стороне сервера'
        })

    }


     res.status(200).json({
        roleID: userFromDb.role_id,
        orderID: order.rows[0].id_order,
        userID: userFromDb.id_user

     })


    } catch (err) {
    console.log("Ошибка авторизации!")
    res.status(500).json({
        err: `Внутреняя ошибка сервера: ${err}` 
    })

    }
    

}
