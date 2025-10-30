const pool = require('../config/db');



//! POST - добавление сервиса в заказ
exports.addServiceToOrder = async (req, res) => {

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

}


//! GET - получение всех сервисов из заказа
exports.getServicesFromOrder = async (req, res) => {
      
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

        let sum = 0;
        for (let i = 0; i < services.length; i++) {
            sum += Number(services[i].price) * data.rows[i].service_count; 
        }

    services_with_count = []
    for(let i = 0; i < services.length; i++)
    {
        const service = services[i];
        const count = data.rows[i].service_count;
        const service_with_count = { ...service, service_count: count };
        services_with_count.push(service_with_count);
    }

    console.log('[200] Получение всех сервисов из заказа')

    return res.status(200).json({
        data: services_with_count,
        sum: sum,
    })


    } catch (err) {
            console.log("Не удалось получить данные для заказа: " + err)
            res.status(500).json({
            err: 'Внутреняя ошибка сервера' 
        })

    }
}



//! PUT - на обновление количества товара в заказе 
exports.putServicesInOrder = async (req, res) => {
    try {
        const orderID = req.params.orderID;
        const serviceID = req.params.serviceID;
        const { service_count } = req.body; 

        if (!orderID || !serviceID || service_count == undefined) {
            return res.status(400).json({
                err: "Необходимо передать все аргументы!"
            });
        }

        const order = await pool.query('SELECT * FROM Orders WHERE ID_order = $1', 
            [orderID]);

        const service = await pool.query('SELECT * FROM Services WHERE ID_service = $1',
             [serviceID]);

        if (order.rows.length === 0 || service.rows.length === 0) {
            return res.status(400).json({
                err: "Некорректные аргументы!"
            });
        }

        const result = await pool.query(
            'UPDATE OrdersServices SET service_count = $1 WHERE order_ID = $2 AND service_ID = $3 RETURNING *',
            [service_count, orderID, serviceID]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ err: "Услуга в заказе не найдена" });
        }

        return res.status(200).json({});

    } catch (err) {
        console.log("Ошибка обновления количества услуги в заказе", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }
}



//! DELETE - удаление сервиса из заказа
exports.deleteServiceFromOrder = async(req, res) => {
       
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
}