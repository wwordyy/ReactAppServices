import './Order.css'
import { getServicesFromOrder } from '../../api/services';
import { useEffect, useState } from 'react';
import ServiceCard from '../ServiceCard/ServiceCard';
import Dashboard from '../Dashboard/Dashboard';


function Order () { 

    const [services, setServices] = useState([]);
    const [sum, setSum] = useState(0);
    const orderID = localStorage.getItem('orderID');


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
                {services.length == 0 ? (<h2>Заказ пуст</h2>) : services.map(service => (
                    <ServiceCard
                        key={service.id_service}
                        id_service={service.id_service}
                        title={service.title}
                        description={service.description}
                        service_time={service.service_time}
                        price={service.price}
                        category={service.category_id}
                        isOrdered={true}
                    />
                ))}

            </div>

            <div className='btn-wrapper'>
                {services.length != 0 ? (<button onClick={handleButton}>Оформить заказ</button>) : ""}
            </div>

        </div>


    );


}



export default Order;