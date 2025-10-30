import React, { useState } from "react";
import { createCategory, updateCategory, deleteCategory } from "../../../api/categories";
import Dashboard from '../../Dashboard/Dashboard';
import '../Admin.css'

function AdminCategories() {
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
    } catch (error) {
      alert("Ошибка создания: " + error.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!categoryId) {
      alert("Введите ID категории");
      return;
    }
    try {
      await updateCategory(categoryId, { title });
      alert("Категория обновлена");
      setCategoryId("");
      setTitle("");
      setIsEditing(false);
    } catch (error) {
      alert("Ошибка обновления: " + error.message);
    }
  }

  async function handleDelete() {
    if (!categoryId) {
      alert("Введите ID категории");
      return;
    }
    if (!window.confirm("Удалить категорию с ID " + categoryId + "?")) return;
    try {
      await deleteCategory(categoryId);
      alert("Категория удалена");
      setCategoryId("");
    } catch (error) {
      alert("Ошибка удаления: " + error.message);
    }
  }

  return (
    <div>

        <Dashboard/>

        <div className="admin-container">

              <h2>Админка категорий</h2>
              <form onSubmit={isEditing ? handleUpdate : handleCreate}>
                {isEditing && (
                  <input
                    type="text"
                    placeholder="ID категории"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  />
                )}
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
