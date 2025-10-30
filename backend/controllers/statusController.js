const pool = require('../config/db');

//! GET - все статусы
exports.getAllStatuses = async (req, res) => {

  console.log("GET запрос на получение всех статусов");

  try {
    const data = await pool.query('SELECT * FROM statuses');
    if (data.rows.length == 0) {
      console.log("Данные не найдены");
      return res.status(404).json({ err: "Данные не найдены" });
    }
    return res.status(200).json({ data: data.rows });


  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};

//! POST - создание статуса
exports.createStatus = async (req, res) => {

  console.log("POST запрос на создание статуса");


  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ err: "Требуется поле title" });
    }
    await pool.query('INSERT INTO statuses (title) VALUES ($1)', [title]);
    return res.status(201).json({});


  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};

//! PUT - обновление статуса по ID
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  console.log(`PUT запрос обновления статуса с ID ${id}`);

  try {
    const result = await pool.query(
      'UPDATE statuses SET title = $1 WHERE ID_status = $2',
      [title, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Статус не найден" });
    }

    return res.status(200).json({ });

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};

//! DELETE - удаление статуса по ID
exports.deleteStatus = async (req, res) => {

  const { id } = req.params;
  console.log(`DELETE запрос удаления статуса с ID ${id}`);

  
  try {
    const result = await pool.query(
      'DELETE FROM statuses WHERE ID_status = $1',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Статус не найден" });
    }
    
    return res.status(200).json({});

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};
