import './Account.css'
import Dashboard from '../Dashboard/Dashboard'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../../api/account';


function Account() {

    const userID = localStorage.getItem("userID")
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [orders, setOrders] = useState([])

    const handleUpdForm = () => {
        navigate('/personalCabinet/updForm');

    }

    const handleLeaveProfile = () => {
        navigate('/')
        localStorage.clear();
    }

    useEffect(() => {
        async function fetchData() {

            if (!userID || userID === "null") {
            console.error("Не задан userID или он некорректен");
            return;
            }
            const data = await getUserOrders(userID)
            if (data.user) {
                setUserData(data.user)
                setOrders(data.orders)
            }
        }
        fetchData()
    }, [userID])



    return (
        <div>
            <Dashboard/>


            <div className='wrapper-account'>
                        <div className='wrapper-btn'>
                              <button onClick={handleUpdForm}>Обновить данные</button>
                            <button onClick={handleLeaveProfile} style={{background: "red", margin: '2px'}}>Выйти из профиля</button>
                          
                        </div>
                    
                        {userData && (
                            <div className="user-info">
                                <h2>Добро пожаловать, {userData.first_name} {userData.last_name}</h2>
                                <p>Email: {userData.user_email}</p>
                                <p>Телефон: {userData.phone}</p>
                            </div>
                        )}

                        <div className="orders-list">
                            <h3>Ваши заказы</h3>
                            {orders.length === 0 && <p>Заказов нет</p>}
                            
                            {orders.map(order => (
                                <div key={order.ID_order} className="order-card">
                                    <p>Заказ №{order.ID_order}</p>
                                    <p>Дата заказа: {new Date(order.order_date).toLocaleDateString()}</p>
                                    <p>Сумма: {order.total_sum} ₽</p>
                                    <p>Адрес доставки: {order.address}</p>
                                    <p>Дата доставки: {order.date_of_delivery ? new Date(order.date_of_delivery).toLocaleDateString() : 'не назначена'}</p>
                                </div>
                            ))}
                        </div>
                </div>
        </div>

    );
}


export default Account;