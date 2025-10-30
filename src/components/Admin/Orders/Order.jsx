import { useState } from "react";
import { createAdminOrder, updateAdminOrder, deleteAdminOrder } from '../../../api/orders';
import Dashboard from '../../Dashboard/Dashboard';
import '../Admin.css';

function AdminOrder() {


  const [orderID, setOrderID] = useState("");
  const [formData, setFormData] = useState({
    total_sum: "",
    order_date: "",
    address: "",
    date_of_delivery: "",
    user_ID: "",
    status_ID: ""
  });


  const [isEditing, setIsEditing] = useState(false);



  function handleChange(e) {
    setFormData({...formData, [e.target.name]: e.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await createAdminOrder(formData);
      alert("Заказ создан");
      setFormData({
        total_sum: "", order_date: "", address: "", date_of_delivery: "", user_ID: "", status_ID: ""
      });
    } catch (error) {
      alert("Ошибка создания: " + error.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if(!orderID){
      alert("Введите ID заказа");
      return;
    }
    try {
      await updateAdminOrder(orderID, formData);
      alert("Заказ обновлен");
      setOrderID("");
      setFormData({
        total_sum: "", order_date: "", address: "", date_of_delivery: "", user_ID: "", status_ID: ""
      });
      setIsEditing(false);
    } catch (error) {
      alert("Ошибка обновления: " + error.message);
    }
  }

  async function handleDelete() {
    if(!orderID){
      alert("Введите ID заказа");
      return;
    }
    if(!window.confirm("Удалить заказ с ID " + orderID + "?")) return;
    try {
      await deleteAdminOrder(orderID);
      alert("Заказ удален");
      setOrderID("");
    } catch (error) {
      alert("Ошибка удаления: " + error.message);
    }
  }

  return (
    <div>
      <Dashboard/>
      <div className="admin-container">
        <h2>Админка заказов</h2>

        <form onSubmit={isEditing ? handleUpdate : handleCreate}>
          {isEditing && <input type="text" placeholder="ID заказа" value={orderID} onChange={e=>setOrderID(e.target.value)} required />}
          <input name="total_sum" placeholder="Сумма" value={formData.total_sum} onChange={handleChange} />
          <input type="date" name="order_date" placeholder="Дата заказа" value={formData.order_date} onChange={handleChange} />
          <input name="address" placeholder="Адрес" value={formData.address} onChange={handleChange} />
          <input type="date" name="date_of_delivery" placeholder="Дата доставки" value={formData.date_of_delivery} onChange={handleChange} />
          <input name="user_ID" placeholder="ID пользователя" value={formData.user_ID} onChange={handleChange} />
          <input name="status_ID" placeholder="Статус ID" value={formData.status_ID} onChange={handleChange} />

          <button type="submit">{isEditing ? "Обновить" : "Создать"}</button>
        </form>

        <button onClick={()=>{
          setIsEditing(!isEditing);
          setOrderID("");
          setFormData({
            total_sum: "", order_date: "", address: "", date_of_delivery: "", user_ID: "", status_ID: ""
          });
        }}>
            
          {isEditing ? "Переключиться на создание" : "Переключиться на обновление"}
        </button>

        {isEditing &&
          <button className="delete-btn" onClick={handleDelete}>Удалить заказ</button>
        }
      </div>
    </div>
  );
}

export default AdminOrder;
