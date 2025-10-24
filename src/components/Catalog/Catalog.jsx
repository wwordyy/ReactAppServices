
import { useEffect, useState } from 'react';
import { getAllServices } from '../../api/services'
import ServiceCard from '../ServiceCard/ServiceCard';
import './Catalog.css'


function Catalog ({ selectedCategoryIds }) {

     const [allServices, setAllServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);

    useEffect(() => {
        async function fetchServices() {
            const response = await getAllServices();
            setAllServices(response.data)
            setFilteredServices(response.data)
        }
        fetchServices();
    }, []);


    useEffect(() => {
        if (selectedCategoryIds.length == 0) {
            setFilteredServices(allServices)

        } else {
             const filtered = allServices.filter(service =>
            selectedCategoryIds.includes(String(service.category_id))
        );
        
        setFilteredServices(filtered);

        }
    }, [selectedCategoryIds, allServices]);

    return (
        <div>
            <h1>Услуги</h1>
            
            <div className="catalog">
                {filteredServices.map(service => (
                    <ServiceCard
                        key={service.id_service}
                        id_service={service.id_service}
                        title={service.title}
                        description={service.description}
                        service_time={service.service_time}
                        price={service.price}
                        category={service.category_id}
                        isOrdered={false}
                    />
                ))}


            </div>
        </div>

    );

}


export default Catalog;