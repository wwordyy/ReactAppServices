import { use, useEffect, useState } from "react";
import { createService, updateService, deleteService, getAllServices } from "../../../api/services";
import DashboardAdmin from '../../Dashboard/DashboardAdmin';

import '../Admin.css'
import { Navigate } from "react-router-dom";
import { getCategories } from "../../../api/categories";

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
  const [categories, setCategories] = useState([])
  const [services, setServices] = useState([])


    const roleID = Number(localStorage.getItem('roleID'));

      if (roleID !== 2) {
        return <Navigate to="/" replace />;
      }


  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories()

      setCategories(response.data)
    }

    fetchCategories()
  }, [])


  async function fetchServices() {
      const response = await getAllServices()
      console.log(response.data);

      setServices(response.data)
      
    }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await createService(formData);
      alert("Услуга создана");
      setFormData({ title: "", description: "", price: "", service_time: "", category_id: "" });
      setCategories([])
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
      alert("Выберите  услугу");
      return;
    }
    if (!window.confirm("Удалить услугу c названием " + formData.title + "?")) return;
      try {
        await deleteService(serviceId);
        alert("Услуга удалена");
        setServiceId("");
        setFormData({ title: "", description: "", price: "", service_time: "", category_id: "" });

        window.location.reload()
      } catch (error) {
        alert("Ошибка: " + error.message);
      }
  }

  return (
    <div>
      <DashboardAdmin />
      <div className="admin-container">
        <h2>Админка услуг</h2>
        <form onSubmit={isEditing ? handleUpdate : handleCreate}>
          {isEditing && (
            <>
            <label>Выберите сервис для редактирования</label>
            <select
                  value={serviceId}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      setServiceId(selectedId);
                      const selectedService = services.find(s => s.id_service.toString() === selectedId);

                      if (selectedService) {
                        setFormData({
                          title: selectedService.title,
                          description: selectedService.description,
                          price: selectedService.price,
                          service_time: selectedService.service_time,
                          category_id: selectedService.category_id
                        });
                      }
                      
                    }}
                  required
                >
                  <option value="" disabled>Выберите сервис</option>
                  {services.map(service => (
                    <option key={service.id_service} value={service.id_service}>
                      {service.title}
                    </option>
                  ))}
            </select>
          </>
        )}
          <label style={{'margin-top': '10px'}}>Название услуги</label>
          <input 
            name="title" 
            placeholder="Название" 
            value={formData.title} 
            onChange={handleChange} 
            required 
            maxLength={249} 
            minLength={5}
          />
          <label>Описание услуги</label>
          <input 
            name="description" 
            placeholder="Описание" 
            value={formData.description} 
            onChange={handleChange} 
            minLength={3}
            maxLength={249} 
          />
        <label>Цена</label>
          <input 
            name="price" 
            type="number"
            placeholder="Цена" 
            value={formData.price} 
            onChange={(e) => {
            const val = e.target.value;

            if (/^\d{0,5}(\.\d{0,2})?$/.test(val)) {
              if (val === "" || parseFloat(val) <= 99999.99) {
                setFormData({ ...formData, price: val });
              }
            }
          }}
          step="0.01"
          max="99999.99"
          />
          <label>Время выполнения в часах</label>
          <input 
            type="time" 
            name="service_time" 
            placeholder="Время" 
            value={formData.service_time} 
            onChange={handleChange} 
          />

          <label >Категория сервиса</label>
          <select 
            name="category_id" 
            value={formData.category_id} 
            onChange={handleChange} 
            required
          >
            <option value="" disabled>Выберите категорию</option>
            {categories.map(cat => (
              <option key={cat.id_category} value={cat.id_category}>
                {cat.title}
              </option>
            ))}
          </select>

            <br />
          <button type="submit">{isEditing ? "Обновить" : "Создать"}</button>
        </form>

        <button
          onClick={() => {
            const newEditing = !isEditing;
            setIsEditing(!isEditing);
            setServiceId("");
            setFormData({ title: "", description: "", price: "", service_time: "", category_id: "" });

            if (newEditing) {
              fetchServices()
            }
          }}
        >
          {isEditing ? "Переключиться на создание" : "Переключиться на редактирование"}
        </button>

        {isEditing && (
          <button 
            onClick={handleDelete} 
            style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}
          >
            Удалить услугу
          </button>
        )}
      </div>
    </div>
  );
}

export default AdminServices;
