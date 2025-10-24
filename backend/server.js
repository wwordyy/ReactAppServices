const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const { resume } = require('react-dom/server');
const { data } = require('react-router-dom');


dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());



const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
})

pool.query('SELECT NOW()', (err) => {
  if (err) {
    console.log('Ошибка подключения к БД:', err);
  } else {
    console.log('Сервер установил соединение с PostgreSQL!');
  }
});

// ! POST - регистрация
app.post('/api/register', async (req, res) => {
    
    try{
    console.log("Отправлен запрос на api/register");
    const {email, password} = req.body;

    console.log(`Email: ${email} \nPassword: ${password}`)

    if (!email || !password) {
      return res.status(400).json({ err: 'Email и пароль обязательны' });
    }

    const userExists = await pool.query('SELECT * FROM users WHERE user_email = $1' , [email]);
    if (userExists.rows.length > 0) {
        return res.status(400).json({ err: 'Пользователь с таким email уже существует!'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const register = await pool.query('INSERT INTO users (user_email, user_password, role_ID) VALUES ($1, $2, $3) RETURNING ID_user', 
        [email, hashedPassword, 1]);
    // 1 - role user
    
        console.log(`USER ID: ${register.rows[0].id_user}`)

    // Создаем Order для пользователя 
    const userID = register.rows[0].id_user;

    const order = await pool.query('INSERT INTO orders (total_sum, order_date, user_ID) VALUES ($1, $2, $3) RETURNING ID_order',
                [0, new Date(), userID]
    );



    res.status(201).json({ 
        orderID: order.rows[0].id_order,
    })

    console.log("ID order: " + order.rows[0].id_order )
} catch (err) {
    console.log("Ошибка регистрации!")
    res.status(500).json({
        err: `Внутреняя ошибка сервера: ${err}` 
    })

}
})


//! POST - авторизация
app.post('/api/login', async(req, res) => {

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
        orderID: order.rows[0].id_order
     })


    } catch (err) {
    console.log("Ошибка авторизации!")
    res.status(500).json({
        err: `Внутреняя ошибка сервера: ${err}` 
    })

    }
    

})

//! GET - все сервисы
app.get('/api/services', async(req, res) => {

    console.log("GET запрос на получение услуг")
    try{
        const data = await pool.query('SELECT * FROM services')
        if (data.rows.length == 0)
        {
            console.log("Данные не найдены")
            return res.status(404).json({
                err: "Данные не найдены"
            })
        }

        return res.status(200).json({
            data: data.rows
        })
    } catch (err) {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }



})



//! GET - все пользователи
app.get('/api/users', async(req, res) => {

    console.log("GET запрос на получение всех пользователей")
    try{
        const data = await pool.query('SELECT * FROM users')
        if (data.rows.length == 0)
        {
            console.log("Данные не найдены")
            return res.status(404).json({
                err: "Данные не найдены"
            })
        }

        return res.status(200).json({
            data: data.rows
        })
    } catch (err) {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }



})

//! POST - добавление сервиса в заказ
app.post('/api/orders/:orderID/services/:serviceID', async (req, res) => {

  try{
        console.log("Запрос на добавление услуги в заказ!")
        const orderID = req.params.orderID
        const serviceID = req.params.serviceID

        if (!orderID  && !serviceID)
        {
            return res.status(400).json({
                err: "Необходимо передать аргументы!"
            });
        }

        const order = await pool.query('SELECT * FROM Orders WHERE ID_order = $1', [orderID])
        const service = await pool.query('SELECT * FROM Services WHERE ID_service = $1', [serviceID])

        if (order.rows.length == 0 || service.rows.length == 0) {
            return res.status(400).json({
                err: "Некоректные аргументы!"
            });
        }

        await pool.query('INSERT INTO OrdersServices (service_count, order_ID, service_ID) VALUES ($1, $2, $3)', 
            [1, orderID, serviceID]
        );

        return res.status(200).json({})


    } catch (err) {
    console.log("Ошибка добавления товара в заказ!")
    res.status(500).json({
        err: 'Внутреняя ошибка сервера' 
    })


    }

})

//! GET - получение всех сервисов из заказа
app.get('/api/orders/:orderID/services', async (req, res) => {
      
    try{
    console.log("Запрос на получение услуг из заказа!")
    

    const orderID = req.params.orderID

        if (!orderID)
        {
            return res.status(400).json({
                err: "Необходимо передать аргументы!"
            });
        }

    
    const order = await pool.query('SELECT * FROM Orders WHERE ID_order = $1', [orderID])

        if (order.rows.length == 0) {
            return res.status(400).json({
                err: "Некоректные аргументы!"
            });
        }

    const data = await pool.query('SELECT * FROM OrdersServices WHERE order_ID = $1', [orderID])
    
    if (data.rows.length == 0)
    {
        return res.status(200).json({ data: [] }); 
    }


    const services = await Promise.all(data.rows.map(async (row) => {
        const serviceData = await pool.query('SELECT * FROM Services WHERE ID_service = $1', [row.service_id]);
        return serviceData.rows[0];

    }))

    let sum = services.reduce((acc, row) => acc + Number(row.price), 0);


    console.log('[200] Получение всех сервисов из заказа')

    return res.status(200).json({
        data: services,
        sum: sum
    })


    } catch (err) {
            console.log("Не удалось получить данные для заказа")
            res.status(500).json({
            err: 'Внутреняя ошибка сервера' 
        })

    }
})




//! DELETE - удаление сервиса из заказа
app.delete('/api/orders/:orderID/services/:serviceID', async(req, res) => {
       
    try{
    console.log("Запрос на удаление услуги из заказа!")
        const orderID = req.params.orderID
        const serviceID = req.params.serviceID

        if (!orderID  || !serviceID)
        {
            return res.status(400).json({
                err: "Необходимо передать аргументы!"
            });
        }

        const order = await pool.query('SELECT * FROM Orders WHERE ID_order = $1', [orderID])
        const service = await pool.query('SELECT * FROM Services WHERE ID_service = $1', [serviceID])

        if (order.rows.length == 0 || service.rows.length == 0) {
            return res.status(400).json({
                err: "Некоректные аргументы!"
            });
        }

     await pool.query('DELETE FROM OrdersServices WHERE order_ID = $1 and service_ID = $2', 
        [orderID, serviceID]);

        console.log('[200] Успешно удалено!')
        return res.status(200).json({})
    } catch (err) {

    console.log("Ошибка удаления услуги из заказа!")
    res.status(500).json({
        err: 'Внутреняя ошибка сервера' 
    })

    }
})




//! POST - подсчет скидки
app.post('/api/coupons/apply', async(req, res) => {

    console.log("Запрос на подсчитывание скидки!");
    
    const {coupon_code, sum, userID} = req.body;

    // Поиск купона
    const couponFromDb = await pool.query('SELECT * FROM Coupons WHERE coupon_code = $1', 
        [coupon_code]);
    
    if (couponFromDb.rows.length == 0)
    {
        console.log("[200] Код скидки указан неправильно")
        return res.status(200).json({
            data: "Купон недействителен!"
        })
    }

    // Проверка купона на персональность
    const coupon = couponFromDb.rows[0];

    if (coupon.is_personal && coupon.user_id != userID)
    {

        console.log("[200] Купон персональный и userID не совпадает")
        return res.status(200).json({
            data: 'Купон персональный и не принадлежит пользователю'
        })
    }

    // Подсчет купона 

    const discountValue = Number(coupon.discount_value);

    const discountedSum = sum * (1 - discountValue / 100);

    console.log("[200] Была подсчитана скидка")

    return res.status(200).json({
        sum: discountedSum
    })
})


//! GET - получение userID по ID заказа
app.get('/api/orders/:orderID/user', async(req, res) => {

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



})


//! GET - все категории
app.get('/api/categories', async(req, res) => {

    console.log("GET запрос на получение всех категорий")
    try{
        const data = await pool.query('SELECT * FROM Categories')
        if (data.rows.length == 0)
        {
            console.log("Данные не найдены")
            return res.status(404).json({
                err: "Данные не найдены"
            })
        }

        return res.status(200).json({
            data: data.rows
        })
    } catch (err) {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }



})


//! PUT - Обновление стоимости заказа
app.put('/api/orders', async (req, res) => {

    try{
        

        console.log('PUT - Обновление стоимости заказа')
        const {orderID, sum} = req.body

        if (!orderID && !sum )
        {
            return res.status(400).json({err: "Не правильно переданы аргументы!"})
        }

       const responseFromDb = await pool.query(
            'UPDATE Orders SET total_sum = $1 WHERE ID_order = $2 RETURNING user_ID',
            [sum, orderID]
        );

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
})


//! POST - создание пустого заказа
app.post('/api/orders', async(req, res) => {
    const {userID} = req.body

    try{

           console.log('POST - Создание заказа')
        if (!userID)
        {
            return res.status(400).json({err: "Не правильно переданы аргументы!"})
        }

        
        const order = await pool.query('INSERT INTO orders (total_sum, order_date, user_ID) VALUES ($1, $2, $3) RETURNING ID_order',
                    [0, new Date(), userID]
        );

        console.log('[201] - Заказ создан')
        res.status(201).json({ 
            orderID: order.rows[0].id_order
        })
    } catch (err) {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }


})





//! -------------------- ADMIN ENDPOINTS --------------------------------



//! POST - добавление купона 
app.post('/api/coupons', async(req, res) => {

    console.log("Запрос на добавление купона!");

    try{
        const {coupon_code, discount_value, is_personal, user_ID} = req.body;

        await pool.query('INSERT INTO Coupons (coupon_code, discount_value, is_personal, user_ID) VALUES ($1, $2, $3, $4)', 
            [coupon_code, discount_value, is_personal, user_ID]);

        console.log('[201] Купон добавлен');
       return res.status(201).json({})

    } catch (err )
    {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }
    
 
})


//! POST - добавление категории
app.post('/api/categories', async(req, res) => {

    console.log("Запрос на добавление категории");

    try{
        const {title} = req.body;

        await pool.query('INSERT INTO Categories (title) VALUES ($1)', 
            [title]);

        console.log('[201] Категория добавлена');
        return res.status(201).json({})

    } catch (err )
    {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }
    
})




// доделать скидку и сделать тип что то чека

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
