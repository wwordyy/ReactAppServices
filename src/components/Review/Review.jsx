import { useEffect, useState } from 'react';
import './Review.css'
import { createReview, getAllReviews } from '../../api/review';
import Dashboard from '../Dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';


function Review() {


    const navigate = useNavigate()

    const [reviews, setReviews] = useState([])
    const [textReview, setTextReview ] = useState('')
    const [rating, setRating] = useState(1)

    useEffect(() => {
        async function fetchReviews() {
            const response = await getAllReviews()

            setReviews(response.data)            
        }
        fetchReviews()

    }, [])


    const handleSubmit =  async (e) => {
         e.preventDefault();

        const data = {
            textReview: textReview,
            rating: Number(rating)
        }

        await createReview(data);

                
        window.location.reload();






    }



    return (
         <div>

                <Dashboard/>


        <div className='review-container'>

            <div wrapper-h2>
                <h2>Отзывы</h2>
            </div>
                <div>
                    <form onSubmit={handleSubmit} >
                        <label>Текст</label>
                        <input type="text" value={textReview} required
                        onChange={(e) => setTextReview(e.target.value)} placeholder='Введите текст отзыва' minLength={3}/>

                        <label>Рейтинг</label>
                        <input type="number"value={rating}  required
                        onChange={(e) => setRating(e.target.value)} placeholder='Укажите рейтинг' min={1} max={5}/>

                        <button>Оставить отзыв</button>


                    </form>
                </div>

                <div>
                    {reviews.length > 0 ? (
                        reviews.map((review, index) => (
                        <div key={index}>
                            <p>Отзыв: {review.text_review}</p>
                            <p>Рейтинг: {review.rating}</p>
                        </div>
                        ))
                    ) : (
                        <p>Отзывов нет</p>
                    )}
                </div>

        </div>

        </div>

    );

}


export default Review;