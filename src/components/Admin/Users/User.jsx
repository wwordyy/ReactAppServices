import  { useState } from "react";
import { createUser, putUser, deleteUser } from "../../../api/users";
import Dashboard from '../../Dashboard/Dashboard';
import '../Admin.css'

function AdminUser() {


  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    phone: "",
    user_email: "",
    user_password: "",
    role_ID: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await createUser(formData);
      alert("Пользователь создан");
      setFormData({
        first_name: "",
        last_name: "",
        middle_name: "",
        phone: "",
        user_email: "",
        user_password: "",
        role_ID: "",
      });
    } catch (error) {
      alert("Ошибка создания: " + error.message);
    }
  }
async function handleUpdate(e) {
  e.preventDefault();
  if (!userId) {
    alert("Введите ID для обновления");
    return;
  }
  try {
    const body = {
      firstName: formData.first_name,
      lastName: formData.last_name,
      middleName: formData.middle_name,
      phone: formData.phone,
      email: formData.user_email,
      password: formData.user_password,
      isPasswordUpd: formData.user_password.length > 0  
    };

    await putUser(body, userId);
    alert("Пользователь обновлён");
    setUserId("");
    setFormData({
      first_name: "",
      last_name: "",
      middle_name: "",
      phone: "",
      user_email: "",
      user_password: "",
      role_ID: "",
    });
    setIsEditing(false);
  } catch (error) {
    alert("Ошибка обновления: " + error.message);
  }
}


  async function handleDelete() {
    if (!userId) {
      alert("Введите ID для удаления");
      return;
    }
    if (!window.confirm("Удалить пользователя с ID " + userId + "?")) return;
    try {
      await deleteUser(userId);
      alert("Пользователь удалён");
      setUserId("");
    } catch (error) {
      alert("Ошибка удаления: " + error.message);
    }
  }

  return (
    <div>

        <Dashboard/>

    <div className="admin-container">
          <h2> Админка пользователя</h2>

          <form onSubmit={isEditing ? handleUpdate : handleCreate}>
            {isEditing && (
              <input
                type="text"
                placeholder="ID пользователя"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                required
              />
            )}

            <input name="first_name" placeholder="Имя" 
            value={formData.first_name} onChange={handleChange} required />

            <input name="last_name" placeholder="Фамилия" 
            value={formData.last_name} onChange={handleChange} required />


            <input name="middle_name" placeholder="Отчество"
             value={formData.middle_name} onChange={handleChange} />

            <input name="phone" placeholder="Телефон" 
            value={formData.phone} onChange={handleChange} />

            <input name="user_email" placeholder="Email" 
            value={formData.user_email} onChange={handleChange} required />

            <input type="password" name="user_password" 
            placeholder="Пароль" value={formData.user_password} onChange={handleChange} required={!isEditing} />

            <input name="role_ID" placeholder="Роль ID"
             value={formData.role_ID} onChange={handleChange} required />
             
            <button type="submit">{isEditing ? "Обновить" : "Создать"}</button>
          </form>

          <button onClick={() => { setIsEditing(!isEditing); setUserId(""); setFormData({
            first_name: "",
            last_name: "",
            middle_name: "",
            phone: "",
            user_email: "",
            user_password: "",
            role_ID: ""
          })}}>
            {isEditing ? "Переключиться на создание" : "Переключиться на обновление"}
          </button>

          {isEditing && <button onClick={handleDelete} style={{marginLeft: "10px", backgroundColor: "red", color: "white"}}>
            Удалить пользователя
          </button>}
        </div>
    </div>
  );
  
}


export default AdminUser;
