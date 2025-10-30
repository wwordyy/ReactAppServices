import  { useState } from "react";
import { createStatus, updateStatus, deleteStatus } from "../../../api/statuses";
import Dashboard from '../../Dashboard/Dashboard';
import '../Admin.css'

function AdminStatus() {

  const [statusId, setStatusId] = useState("");
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      if (!title) {
        alert("Введите название статуса");
        return;
      }
      await createStatus({ title });
      alert("Статус создан");
      setTitle("");
    } catch (error) {
      alert("Ошибка создания: " + error.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!statusId) {
      alert("Введите ID для обновления");
      return;
    }
    try {
      await updateStatus(statusId, { title });
      alert("Статус обновлен");
      setStatusId("");
      setTitle("");
      setIsEditing(false);
    } catch (error) {
      alert("Ошибка обновления: " + error.message);
    }
  }

  async function handleDelete() {
    if (!statusId) {
      alert("Введите ID для удаления");
      return;
    }
    if (!window.confirm("Удалить статус с ID " + statusId + "?")) return;
    try {
      await deleteStatus(statusId);
      alert("Статус удален");
      setStatusId("");
    } catch (error) {
      alert("Ошибка удаления: " + error.message);
    }
  }

  return (
    <div>

        <Dashboard/>

    <div className="admin-container">
              <h2>Админка статусов</h2>

              <form onSubmit={isEditing ? handleUpdate : handleCreate}>
                {isEditing && (
                  <input
                    type="text"
                    placeholder="ID статуса"
                    value={statusId}
                    onChange={e => setStatusId(e.target.value)}
                    required
                  />
                )}
                <input
                  type="text"
                  placeholder="Название статуса"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
                <button type="submit">{isEditing ? "Обновить" : "Создать"}</button>
              </form>

              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setStatusId("");
                  setTitle("");
                }}
              >
                {isEditing ? "Переключиться на создание" : "Переключиться на обновление"}
              </button>

              {isEditing && (
                <button
                  onClick={handleDelete}
                  style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}
                >
                  Удалить статус
                </button>
              )}
            </div>

    </div>
  );
}


export default AdminStatus;
