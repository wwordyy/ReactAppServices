const pool = require('../config/db');



//! GET - все сервисы
exports.getAllServices = async(req, res) => {

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





    
}


//! POST - создание новой услуги
exports.createService = async (req, res) => {
  console.log("POST запрос на создание услуги");

  try {
    const { title, description, price, service_time, category_id } = req.body;

    if (!title || !description || !price || !service_time || !category_id) {
      return res.status(400).json({ err: "Не все поля заполнены" });
    }

    await pool.query(
      `INSERT INTO services (title, description, price, service_time, category_id)
       VALUES ($1, $2, $3, $4, $5)`,
      [title, description, price, service_time, category_id]
    );

    console.log("[201] Услуга добавлена");
    return res.status(201).json({});
    
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};



//! PUT - обновление услуги по ID
exports.updateService = async (req, res) => {

  const { id } = req.params;
  const { title, description, price, service_time, category_id } = req.body;

  console.log(`PUT запрос обновления услуги с ID ${id}`);

  try {
    const result = await pool.query(
      `UPDATE services SET 
        title = $1, 
        description = $2, 
        price = $3, 
        service_time = $4, 
        category_id = $5 
      WHERE id_service = $6`,
      [title, description, price, service_time, category_id, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Услуга не найдена" });
    }

    return res.status(200).json({});


  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};




//! DELETE - удаление услуги по ID
exports.deleteService = async (req, res) => {
  const { id } = req.params;

  console.log(`DELETE запрос удаления услуги с ID ${id}`);

  try {
    const result = await pool.query(
      "DELETE FROM services WHERE id_service = $1",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Услуга не найдена" });
    }

    return res.status(200).json({ message: "Услуга удалена" });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};
