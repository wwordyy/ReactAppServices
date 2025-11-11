
const pool = require('../config/db');
const bcrypt = require('bcrypt');


//! GET - все пользователи
exports.getAllUsers = async(req, res) => {

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



}


//! GET - получения usera по ID
exports.getUserById = async(req, res) => {

    console.log("GET запрос получения пользователя по ID")
    try{
        const userID = req.params.userID;

        const data = await pool.query('SELECT * FROM Users WHERE ID_user = $1', 
            [userID])

        if (data.rows.length == 0)
        {
            console.log("Пользователь не найден")

            return res.status(404).json({
                err: "Данные не найдены"
            })
        }
        
        return res.status(200).json({
            user: data.rows[0]
        })
        


    } catch(err) {
        console.error("Ошибка сервера:", err);
        return res.status(500).json({ err: "Внутренняя ошибка сервера" });

    }


}


// ! PATCH - удаление адреса по умолчанию
exports.patchDellDefaultAdress = async (req, res) => {

  const userID = req.params.userID;

  try {
    const result = await pool.query(
      'UPDATE Users SET default_address = $1 WHERE ID_user = $2',
      [null, userID]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Пользователь не найден" });
    }

    return res.status(200).json({});

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};




//! PUT - Обноавление user
exports.putUser = async (req, res) => {


  try {
    const ID_user = req.params.userID;

    let { firstName, lastName, middleName, phone, email, password, isPasswordUpd } = req.body;

    console.log(req.body)

    if (isPasswordUpd && password) {
      password = await bcrypt.hash(password, 10);
    } else {
      password = undefined;
    }

    if (password) {
      await pool.query(
        `UPDATE Users SET first_name = $1, last_name = $2, middle_name = $3, phone = $4, user_email = $5, user_password = $6 WHERE ID_user = $7`,
        [firstName, lastName, middleName, phone, email, password, ID_user]
      );
    } else {
      await pool.query(
        `UPDATE Users SET first_name = $1, last_name = $2, middle_name = $3, phone = $4, user_email = $5 WHERE ID_user = $6`,
        [firstName, lastName, middleName, phone, email, ID_user]
      );
    }

    return res.status(200).json({});
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};


//! POST - создание нового пользователя
exports.createUser = async (req, res) => {
  

  try {

    const { first_name, last_name, middle_name, phone, user_email, user_password, role_ID } = req.body;

    if (!first_name || !last_name || !user_email || !user_password || !role_ID) {
      return res.status(400).json({ err: "Обязательные поля отсутствуют" });
    }

    const hashedPassword = await bcrypt.hash(user_password, 10);

    await pool.query(
      `INSERT INTO users (first_name, last_name, middle_name, phone, user_email, user_password, role_ID)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [first_name, last_name, middle_name, phone, user_email, hashedPassword, role_ID]
    );

    return res.status(201).json({});


  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};

//! DELETE - удаление пользователя по ID
exports.deleteUser = async (req, res) => {

  const userID = req.params.userID;

  try {
    const result = await pool.query(
      'DELETE FROM users WHERE ID_user = $1',
      [userID]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ err: "Пользователь не найден" });
    }

    return res.status(200).json({});

  } catch (err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }
};




exports.patchDefaultAdress = async(req, res) => {
  const {defaultAddress, userID} = req.body;

  try{
    console.log('[patch] Запрос на добавления адреса по умолчанию')

    await pool.query('UPDATE Users SET default_address = $1 WHERE ID_user = $2', [defaultAddress, userID])


    res.status(200).json({})


  } catch(err) {
    console.error("Ошибка сервера:", err);
    return res.status(500).json({ err: "Внутренняя ошибка сервера" });
  }

}