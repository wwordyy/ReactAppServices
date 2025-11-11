import './Account.css'
import Dashboard from '../Dashboard/Dashboard'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserOrders } from '../../api/account';
import { patchAddDefaultAdress, patchDellDefaultAdress } from '../../api/users';
import ReviewForm from './ReviewForm';


function Account() {

    const userID = localStorage.getItem("userID")
    const [defaultAddress, setDefaultAddress] = useState('');
    const navigate = useNavigate()
    const [userData, setUserData] = useState(null)
    const [orders, setOrders] = useState([])
    const roleID = Number(localStorage.getItem('roleID'))

    const handleUpdForm = () => {
        navigate('/personalCabinet/updForm');

    }


    const hadnleDellDefaultAddress = async(e) => {
        e.preventDefault()

            await patchDellDefaultAdress(userID);

            alert('Адрес удален!')

            window.location.reload();


    }

    const handleAddDefaultAddress = async (e) => {
             e.preventDefault();

             const data = {
                defaultAddress: defaultAddress,
                userID: userID
             }

             await patchAddDefaultAdress(data)

             alert('Адрес по умолчанию добавлен')

            window.location.reload();

    }

    const handleLeaveProfile = () => {
        navigate('/')
        localStorage.clear();
    }

    useEffect(() => {
        async function fetchData() {

                if (roleID == 2) 
                {
                    return  navigate('/admin')
                }
                if (roleID == 0)
                {
                    return navigate('/login')
                }

            if (!userID || userID === "null") {
            console.error("Не задан userID или он некорректен");
            return;
            }
            const data = await getUserOrders(userID)
            if (data.user) {
                console.log(data);

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

                                {userData.defaultAddress == null ? (
                                    <form onSubmit={handleAddDefaultAddress} style={{"margin-top": '10px'}}>
                                    <label>Адрес по умолчанию:</label>
                                    <input type='text' placeholder='Введите адрес по умолчанию' maxLength={255} value={defaultAddress} 
                                    onChange={(e) => setDefaultAddress(e.target.value)}
                                    />

                                    <button>Добавить адрес</button>
                                </form>


                                ) : ( 
                                    <div>
                                            <label>Адрес по умолчанию: {userData.defaultAddress}</label>
                                            <button onClick={hadnleDellDefaultAddress}>Удалить адрес</button>
                                    </div>

                                
                                
                                )} 
                                
                            </div>
                        )}


                        <ReviewForm/>

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