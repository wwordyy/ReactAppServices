const pool = require('../config/db');


//! GET Получение всех отзывов
exports.getAllReview = async(req, res) => {

     console.log("GET запрос на получение всех отзывов")
    try{
        const data = await pool.query('SELECT * FROM Reviews')
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

//! POST Создание отзыва
exports.createReview = async(req, res) => {
    
    console.log("Запрос на добавление отзыва");

    try{
        const {textReview, rating, serviceId, userId} = req.body;

       const data = await pool.query('SELECT * FROM Usersreviews WHERE user_ID = $1 and service_ID = $2', [userId, serviceId])

          
        if (data.rows.length > 0) {
          return res.status(400).json({
            err: 'Нельзя оставить повторно отзыв на один и тот же товар!'
          })
        }

       const review =  await pool.query('INSERT INTO Reviews (text_review, rating) VALUES ($1, $2) RETURNING  ID_review', 
            [textReview, rating]);

        const idReview = review.rows[0].id_review


        if (data.rows.length > 0) {
          return res.status(400).json({
            err: 'Отзыв за данный аккаунт уже был оставлен!'
          })
        }


        await pool.query(
          'INSERT INTO Usersreviews(service_ID, user_ID, review_ID) VALUES($1,$2,$3)', 
          [serviceId, userId, idReview]
        )


        console.log('[201] Отзыв добавлен');
        return res.status(201).json({})

    } catch (err )
    {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });
    }

}


//! PUT - обновление отзыва по ID
exports.updateReview = async (req, res) => {
  const { id } = req.params;
  const { textReview, rating } = req.body;

  console.log(`PUT запрос обновления отзыва с ID ${id}`);

  try {
    const result = await pool.query(
      'UPDATE Reviews SET text_review = $1, rating = $2 WHERE ID_review = $3',
      [textReview, rating, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Отзыв не найден" });
    }

    return res.status(200).json({});

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};


//! DELETE - удаление отзыва по ID
exports.deleteReview = async (req, res) => {
  const { id } = req.params;

  console.log(`DELETE запрос удаления отзыва с ID ${id}`);

  try {
    const result = await pool.query('DELETE FROM Reviews WHERE ID_review = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Отзыв не найден" });
    }

    return res.status(200).json({});

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};


