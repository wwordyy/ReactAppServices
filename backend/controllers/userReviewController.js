const pool = require('../config/db');


exports.getAllDataReviews = async (req, res) => {


        console.log("GET запрос на получение всех данных об отзывах")
    try{
        const data = await pool.query
        ('SELECT * FROM  UsersReviews ur JOIN Services s ON ur.service_ID = s.ID_service JOIN Users u ON ur.user_ID = u.ID_user JOIN Reviews r ON ur.review_ID = r.ID_review')

        if (data.rows.length == 0)
        {
            console.log("Данные не найдены")
            return res.status(200).json({
                data: []
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


//! GET получение отзыва по ID пользователя 
exports.getReviewByUserId = async (req, res) => {
    
    const {id} = req.params;


      console.log("GET запрос на отзыв пользователя")
    try{
        const data = await pool.query(
            'SELECT * FROM UsersReviews ur JOIN Reviews r ON ur.review_ID = r.ID_review JOIN Services s ON ur.service_ID = s.ID_service WHERE ur.user_ID = $1', 
            [id]
        )

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