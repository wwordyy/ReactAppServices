const pool = require('../config/db');


//! GET - все категории
exports.getAllCategories = async(req, res) => {

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



}


//! POST - добавление категории
exports.addCategory = async(req, res) => {

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
    
}


//! PUT - обновление категории по ID
exports.updateCategory = async (req, res) => {

  const { id } = req.params;
  const { title } = req.body;

  console.log(`PUT запрос обновления категории с ID ${id}`);

  try {
    const result = await pool.query(
      'UPDATE Categories SET title = $1 WHERE ID_category = $2',
      [title, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Категория не найдена" });
    }

    return res.status(200).json({});

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};


//! DELETE - удаление категории по ID
exports.deleteCategory = async (req, res) => {

  const { id } = req.params;

  console.log(`DELETE запрос удаления категории с ID ${id}`);

  try {
    const result = await pool.query('DELETE FROM Categories WHERE ID_category = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Категория не найдена" });
    }

    return res.status(200).json({});

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};


