import { use, useEffect, useState } from 'react';
import './Review.css'
import { createReview, getAllDataReviews, getAllReviews } from '../../api/review';
import Dashboard from '../Dashboard/Dashboard';
import { Navigate, useNavigate } from "react-router-dom";
import { getAllServices } from '../../api/services';



function Review() {


    const navigate = useNavigate()
    const [reviews, setReviews] = useState([])
    const [textReview, setTextReview ] = useState('')
    const [rating, setRating] = useState(1)
    const [allServices, setAllServices] = useState([])
    const [selectedService, setSelectedService] = useState('')
    const userId = localStorage.getItem('userID')
    const [err, setErr] = useState('')


    const roleID = Number(localStorage.getItem('roleID'));

    if (roleID == 0)
    {
        return navigate('/login')
    }

    if (roleID === 2) {
        return <Navigate to="/admin" replace />;
    }

    useEffect(() => {
        async function fetch() {

            

          const responseReviews = await getAllDataReviews();


        setReviews(responseReviews.data)

      


            const responseServices = await getAllServices();
            setAllServices(responseServices.data);


            if (responseServices.data.length > 0) {
                setSelectedService(responseServices.data[0].id_service);
            }

        }
        fetch()

    }, [])


    const handleSubmit =  async (e) => {
         e.preventDefault();

         

        const data = {
            serviceId: Number(selectedService),
            textReview: textReview,
            rating: Number(rating),
            userId: Number(userId)
        }

      try {
        await createReview(data);

        window.location.reload()

        } catch (error) {
            setErr(error.message);
        }

    }


    function renderStars(rating) {
        const maxStars = 5;
        const filledStars = '★'.repeat(rating);
        const emptyStars = '☆'.repeat(maxStars - rating);
        return filledStars + emptyStars;
    }



    return (
         <div>

                <Dashboard/>


        <div className='review-container'>

            <div>
                <h2>Отзывы</h2>
            </div>
                <div>
                    <form onSubmit={handleSubmit} >

                         <label>Услуга</label>
                        <select value={selectedService} onChange={e => setSelectedService(e.target.value)} required>

                            {allServices.map(service => (
                            <option key={service.id_service} value={service.id_service}>
                                {service.title}
                            </option>
                            ))}
                        </select>


                        <label>Текст</label>
                        <input type="text" value={textReview}
                        onChange={(e) => setTextReview(e.target.value)} placeholder='Введите текст отзыва (необязательно)' />

                        <label>Рейтинг</label>
                        <input type="number"value={rating}  required
                        onChange={(e) => setRating(e.target.value)} placeholder='Укажите рейтинг' min={1} max={5}/>

                        <button>Оставить отзыв</button>

                        {err && <div className="error-message" style={{ color: "red", marginTop: "10px" }}>{err}</div>}
                    </form>

                </div>

          <div>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                <div key={index} className="review-item">
                    <p><strong>Рейтинг:</strong> {renderStars(review.rating)}</p>
                    <p><strong>Пользователь:</strong> {`${review.first_name} ${review.last_name} ${review.middle_name}`.trim()}</p>
                    <p><strong>Услуга:</strong> {review.title}</p>

                    {review.text_review  ? (
                        <p><strong>Отзыв:</strong> {review.text_review}</p>

                    ) : (
                        null

                    )}
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