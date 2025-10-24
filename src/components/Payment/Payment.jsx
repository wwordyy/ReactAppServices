import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { postDiscount } from "../../api/coupons";
import './Payment.css'
import { putOrder } from "../../api/orders";
import { useNavigate } from "react-router-dom";


function Payment()
{
    const sum = localStorage.getItem('sum');
    const navigate = useNavigate();
    const [coupon, setCoupon] = useState("");
    const orderID = localStorage.getItem("orderID");
    const [discountedSum, setDiscountedSum] = useState(null);
    const [error, setError] = useState(null);

    const handleDiscount = async (e) => {

        e.preventDefault();

        const data = {
            'coupon_code': coupon,
            'orderID': orderID,
            'sum': parseInt(sum)
        };

        try{
            const response = await postDiscount(data);

            if (response.sum)
            {
                setDiscountedSum(response.sum);
                setError(null);
                alert("Купен применен!")
                localStorage.setItem('sum', response.sum)
            }
            else if (response.data)
            {
                setError(response.data);
                setDiscountedSum(null);
            }
            
        } catch(err) {
            setError(err.message);
            setDiscountedSum(null);
        }
    }

    const handlePayment = async () => {
        const currentSum = localStorage.getItem('sum') || sum;
        const data = {
            orderID: orderID,
            sum: parseFloat(currentSum)
        };

        if (!orderID) {
            alert('Отсутствует идентификатор заказа');
            return;
        }

        const response = await putOrder(data);
        if (response && response.orderID) {
            localStorage.setItem('orderID', response.orderID);
            alert(`Совершена покупка на сумму: ${currentSum}`);
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
                

                <form onSubmit={handleDiscount}>
                

                    <label>Скидка</label>

                    <input type="text" placeholder="Код купона (необязательно)" 
                    value={coupon} onChange={(e) => setCoupon(e.target.value)}/>

                        <div className="buttons-row">
                            <button type="submit">Применить купон</button>
                            <button type="button" onClick={handlePayment}>Оформить покупку</button>
                    </div>


                    {discountedSum !== null && (<p>Сумма со скидкой: {discountedSum.toFixed(2)}</p>)}

                      {discountedSum == null && (<p>Общая сумма заказа: {sum}</p>)}
                    
                       {error && <p style={{ color: "red" }}>{error}</p>}

                </form>

                
             

            </div>

        </div>

    );

}

export default Payment;