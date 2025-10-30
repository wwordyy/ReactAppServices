import { useState } from "react";
import { createService, updateService, deleteService } from "../../../api/services";
import Dashboard from '../../Dashboard/Dashboard';
import '../Admin.css'

function AdminServices() {

  const [serviceId, setServiceId] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    service_time: "",
    category_id: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await createService(formData);
      alert("Услуга создана");
      setFormData({ title: "", description: "", price: "", service_time: "", category_id: "" });
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!serviceId) {
      alert("Введите ID услуги");
      return;
    }
    try {
      await updateService(serviceId, formData);
      alert("Услуга обновлена");
      setServiceId("");
      setFormData({ title: "", description: "", price: "", service_time: "", category_id: "" });
      setIsEditing(false);
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  }

  async function handleDelete() {
    if (!serviceId) {
      alert("Введите ID услуги");
      return;
    }
    if (!window.confirm("Удалить услугу с ID " + serviceId + "?")) return;
    try {
      await deleteService(serviceId);
      alert("Услуга удалена");
      setServiceId("");
    } catch (error) {
      alert("Ошибка: " + error.message);
    }
  }

  return (
    <div>
        
        <Dashboard/>

        <div className="admin-container">

                <h2>Админка услуг</h2>
                
                <form onSubmit={isEditing ? handleUpdate : handleCreate}>
                  {isEditing && (
                    <input
                      type="text"
                      placeholder="ID услуги"
                      value={serviceId}
                      onChange={(e) => setServiceId(e.target.value)}
                      required
                    />
                  )}
                  <input name="title" placeholder="Название" value={formData.title} onChange={handleChange} required />
                  <input name="description" placeholder="Описание" value={formData.description} onChange={handleChange} />
                  <input name="price" placeholder="Цена" value={formData.price} onChange={handleChange} />
                  <input type="time" name="service_time" placeholder="Время" value={formData.service_time} onChange={handleChange} />
                  <input name="category_id" placeholder="ID категории" value={formData.category_id} onChange={handleChange} />
                  <button type="submit">{isEditing ? "Обновить" : "Создать"}</button>
                </form>

                <button
                  onClick={() => {
                    setIsEditing(!isEditing);
                    setServiceId("");
                    setFormData({ title: "", description: "", price: "", service_time: "", category_id: "" });
                  }}
                >
                  {isEditing ? "Переключиться на создание" : "Переключиться на редактирование"}
                </button>

                {isEditing && (
                  <button onClick={handleDelete} style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}>
                    Удалить услугу
                  </button>
                )}
              </div>
    </div>
  );
}

export default AdminServices;
