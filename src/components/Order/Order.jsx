import './Order.css'
import { Navigate } from "react-router-dom";
import { getServicesFromOrder } from '../../api/services';
import { useEffect, useState } from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import Dashboard from '../Dashboard/Dashboard';
import { putServiceCountInOrder } from '../../api/orders';


function Order () { 

    const [services, setServices] = useState([]);
    const [sum, setSum] = useState(0);
    const orderID = localStorage.getItem('orderID');

    const roleID = Number(localStorage.getItem('roleID'));


    if (roleID === 2) {
        return <Navigate to="/admin" replace />;
    }


    useEffect(() => {
        async function fetchServices() {
            const response = await getServicesFromOrder(orderID);

            console.log(response.data);

            setServices(response.data);
            setSum(response.sum);   
            localStorage.setItem('sum', sum);
        }

        fetchServices();

    }, []);


     const handleCountChange = async (serviceID, newCount) => {
        if (newCount < 1) return; 

        try {
            await putServiceCountInOrder({
                service_count: newCount
            }, orderID, serviceID);

            const updatedServices = services.map(s => {
                if (s.id_service === serviceID) {
                    return {...s, service_count: newCount};
                }
                return s;
            });
            setServices(updatedServices);
            
            const newSum = updatedServices.reduce((acc, s) => acc + s.price * s.service_count, 0);
            setSum(newSum);
            localStorage.setItem('sum', newSum);
        } catch (err) {
            console.error("Ошибка обновления количества", err);
        }
    };

    const incrementCount = (serviceID, currentCount) => {
        handleCountChange(serviceID, currentCount + 1);
    };

    const decrementCount = (serviceID, currentCount) => {
        if (currentCount > 1) {
            handleCountChange(serviceID, currentCount - 1);
        }
    };

    function handleButton() {

        localStorage.setItem('sum', sum);

        window.location.href = '/payment';

    }


    return (   
        <div className='order-wrapper'>

            <Dashboard/>
            <h1>Заказ</h1>

            {sum ? (<div className='sum-container'>Сумма заказа: {sum} ₽</div>) : ""}

            <div className='order-container'>

                {services.length === 0 ? (<h2>Заказ пуст</h2>) : services.map(service => (
                    <div key={service.id_service} className="service-with-count">
                        <ServiceCard
                            id_service={service.id_service}
                            title={service.title}
                            description={service.description}
                            service_time={service.service_time}
                            price={service.price}
                            category={service.category_id}
                            isOrdered={true}
                        />

                        <div className="service-count-controls">
                            <label>Кол-во: </label>
                            <button onClick={() => decrementCount(service.id_service, service.service_count || 1)}>-</button>
                            <span style={{margin: '0 10px'}}>{service.service_count || 1}</span>
                            <button onClick={() => incrementCount(service.id_service, service.service_count || 1)}>+</button>
                        </div>
                    </div>
                ))}

            </div>

            <div className='btn-wrapper'>
                {services.length != 0 ? (<button onClick={handleButton}>Оформить заказ</button>) : ""}
            </div>

        </div>


    );


}



export default Order;