import React, { useEffect, useState } from "react";
import { createCategory, updateCategory, deleteCategory, getCategories } from "../../../api/categories";
import DashboardAdmin from '../../Dashboard/DashboardAdmin';

import '../Admin.css'
import { Navigate } from "react-router-dom";

function AdminCategories() {
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [categories, setCategories] = useState([]);


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

  async function handleCreate(e) {
    e.preventDefault();
    try {
      if (!title) {
        alert("Введите название категории");
        return;
      }
      await createCategory({ title });
      alert("Категория создана");
      setTitle("");

      window.location.reload();
    } catch (error) {
      alert("Ошибка создания: " + error.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!categoryId) {
      alert("Выберите категорию для обновления!");
      return;
    }
    try {
      await updateCategory(categoryId, { title });
      alert("Категория обновлена");
      setCategoryId("");
      setTitle("");
      setIsEditing(false);


           window.location.reload();
    } catch (error) {
      alert("Ошибка обновления: " + error.message);
    }
  }

  async function handleDelete() {
    if (!categoryId) {
      alert("Выберите категорию!");
      return;
    }
    if (!window.confirm("Удалить категорию с названием: " + title + "?")) return;
    try { 
      await deleteCategory(categoryId);
      alert("Категория удалена");
      setCategoryId("");


      window.location.reload();
    } catch (error) {
      alert("Ошибка удаления: " + error.message);
    }
  }

  return (
    <div>

        <DashboardAdmin/>

        <div className="admin-container">

              <h2>Админка категорий</h2>
              <form onSubmit={isEditing ? handleUpdate : handleCreate}>
                {isEditing && (
                  <select
                    value={categoryId}
                    onChange={(e) => {

                      const selectedId = e.target.value;
                      setCategoryId(selectedId);
                      const selectedCategory = categories.find(cat => String(cat.id_category) === selectedId);
                      setTitle(selectedCategory ? selectedCategory.title : "");

                    }}
                    required
                  >
                    <option value="">Выберите категорию</option>

                    {categories.map((cat) => (
                      <option key={cat.id_category} value={cat.id_category}>
                        {cat.title}
                      </option>
                    ))}

                  </select>
                )}

                <label style={{'margin-top': '10px'}}>Название категории</label>
                <input
                  type="text"
                  placeholder="Название категории"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <button type="submit">{isEditing ? "Обновить" : "Создать"}</button>
              </form>

              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setCategoryId("");
                  setTitle("");
                }}
              >
                {isEditing ? "Переключиться на создание" : "Переключиться на редактирование"}
              </button>

              {isEditing && (
                <button onClick={handleDelete} style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}>
                  Удалить категорию
                </button>
              )}
            </div>

    </div>
  );
}

export default AdminCategories;
