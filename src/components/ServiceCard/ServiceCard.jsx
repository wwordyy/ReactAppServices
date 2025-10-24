import './ServiceCard.css'
import { postAddServiceToOrder } from '../../api/services'
import { deleteServiceByIdFromOrder } from '../../api/services'


function ServiceCard({id_service, title, description, service_time, price, category, isOrdered})
{

    const orderID = localStorage.getItem('orderID')

    async function handleAddService() {
        
        if (!orderID)
        {
            alert("Необходимо авторизоваться!")
            return 
        }

       await postAddServiceToOrder(orderID, id_service);
        alert("Услуга добавлена в заказ!");

    }


    async function handleDeleteServiceFromOrder() {
        
        await deleteServiceByIdFromOrder(orderID, id_service)
         window.location.reload();
    }

    return (
        <div className="service-card">
            <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <time datetime={service_time}>Длительность: {service_time}</time>
                <br />
                <span>Цена: {price}</span>
            </div>


            {isOrdered ? (
                <button onClick={handleDeleteServiceFromOrder}>Удалить</button>
            ) : (
                <button onClick={handleAddService}>add to order</button>
            )}
        </div>

    );

}

export default ServiceCard;