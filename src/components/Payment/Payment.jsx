import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import './Payment.css'
import { putOrder } from "../../api/orders";
import { useNavigate } from "react-router-dom";


function Payment()
{
    const sum = localStorage.getItem('sum');
    const navigate = useNavigate();
    const orderID = localStorage.getItem("orderID");

    const [adress, setAdress] = useState('');
    const [dateOfDelivery, setDateOfDelivery] = useState('');
    const today = new Date().toISOString().split('T')[0];


    const handlePayment = async () => {
        const data = {
            dateOfDelivery: dateOfDelivery, 
            address: adress,
            orderID: orderID,
            sum: parseFloat(sum)
        };

        if (!orderID) {
            alert('Отсутствует идентификатор заказа');
            return;
        }

        const response = await putOrder(data);

        if (response && response.orderID) {
            localStorage.setItem('orderID', response.orderID);
            alert(`Совершена покупка на сумму: ${sum} ₽`);

            navigate('/');
        } else {
            alert('Ошибка при оформлении заказа');
        }
    }


    return (
        <div className="wrapper-payment">

            <Dashboard/>

            <h1>Оплата заказа</h1>

          

            <div  className="payment-container">
                

                <form>
        
                    <label >Адрес</label>
                    <input type="text" placeholder="Введите адрес доставки" 
                    required minLength={5} value={adress} onChange={e => setAdress(e.target.value)} />

                        <label >Дата доставки</label>
                    <input type="date" placeholder="Введите дату доставки" 
                    required minLength={5} value={dateOfDelivery}  min={today} onChange={e => setDateOfDelivery(e.target.value)} />

                    <button type="button" onClick={handlePayment}>Оформить покупку</button>

                <p>Общая сумма заказа: {sum} ₽</p>
        
                </form>

                
             

            </div>

        </div>

    );

}

export default Payment;