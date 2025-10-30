import { useState } from "react";
import { createReview, updateReview, deleteReview } from "../../../api/review";
import Dashboard from '../../Dashboard/Dashboard';
import '../Admin.css'

function AdminReviews() {

  const [reviewId, setReviewId] = useState("");
  const [formData, setFormData] = useState({
    textReview: "",
    rating: ""
  });
  const [isEditing, setIsEditing] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await createReview(formData);
      alert("Отзыв создан");
      setFormData({ textReview: "", rating: "" });
    } catch (error) {
      alert("Ошибка создания: " + error.message);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (!reviewId) {
      alert("Введите ID отзыва");
      return;
    }
    try {
      await updateReview(reviewId, formData);
      alert("Отзыв обновлен");
      setReviewId("");
      setFormData({ textReview: "", rating: "" });
      setIsEditing(false);
    } catch (error) {
      alert("Ошибка обновления: " + error.message);
    }
  }

  async function handleDelete() {
    if (!reviewId) {
      alert("Введите ID отзыва");
      return;
    }
    if (!window.confirm("Удалить отзыв с ID " + reviewId + "?")) return;
    try {
      await deleteReview(reviewId);
      alert("Отзыв удален");
      setReviewId("");
    } catch (error) {
      alert("Ошибка удаления: " + error.message);
    }
  }

  return (
    <div>

        <Dashboard/>

      <div className="admin-container">
              <h2>Админка отзывов</h2>


              <form onSubmit={isEditing ? handleUpdate : handleCreate}>
                {isEditing && (
                  <input
                    type="text"
                    placeholder="ID отзыва"
                    value={reviewId}
                    onChange={(e) => setReviewId(e.target.value)}
                    required
                  />
                )}
                <input
                  name="textReview"
                  placeholder="Текст отзыва"
                  value={formData.textReview}
                  onChange={handleChange}
                  required
                />
                <input
                  name="rating"
                  placeholder="Рейтинг"
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={handleChange}
                  required
                />
                <button type="submit">{isEditing ? "Обновить" : "Создать"}</button>
              </form>

              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setReviewId("");
                  setFormData({ textReview: "", rating: "" });
                }}
              >
                {isEditing ? "Переключиться на создание" : "Переключиться на редактирование"}
              </button>

              {isEditing && (
                <button onClick={handleDelete} style={{ marginLeft: 10, backgroundColor: "red", color: "white" }}>
                  Удалить отзыв
                </button>
              )}
            </div>

    </div>
  );
}


export default AdminReviews;
