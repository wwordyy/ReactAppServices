import { useEffect, useState } from "react";
import { deleteReview, getReviewByUserId } from "../../api/review";


function ReviewForm () {

    const userID = localStorage.getItem('userID')

    const [review, setReview] = useState([])

    useEffect( () => {
        async function fetchReview() {
            
            const response = await getReviewByUserId(userID)

            console.log("Review:  ", response.data )

            setReview(response.data)
            
        }

        fetchReview()
    }, [])


    async function handleDeleteReview(id) {

        console.log("Review: "+  id)

        await deleteReview(id)

        alert('Отзыв был удален')

        window.location.reload();
        
    }


    function renderStars(rating) {
        const maxStars = 5;
        const filledStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(maxStars - rating);
        return filledStars + emptyStars;
    }

    return (
        <div className="reviews-list">
            <h3>Мои отзывы</h3>
            {review.length > 0 ? (
                review.map(item => (
                    <div key={item.id_user_review} style={{ marginBottom: "20px" }}>
                        <p><strong>Рейтинг:</strong> {renderStars(item.rating)}</p>
                        <p><strong>Услуга:</strong> {item.title}</p>
                        <p><strong>Отзыв:</strong> {item.text_review ? item.text_review : "Пусто"}</p>
                        <button onClick={() => handleDeleteReview(item.id_review)}>Удалить отзыв</button>
                    </div>
                ))
            ) : (
                <div>Вы еще не оставляли отзыв</div>
            )}
        </div>
    );
        


}

export default ReviewForm;