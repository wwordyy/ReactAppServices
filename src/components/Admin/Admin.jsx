import Dashboard from '../Dashboard/Dashboard';
import { Link } from 'react-router-dom';


function Admin() {
    return (
        <div >
            <Dashboard/>

            <nav className="admin-nav">
                <Link to="/admin/users" className="admin-nav-button">Пользователи</Link>
                  <Link to="/admin/orders" className="admin-nav-button">Заказы</Link>
                <Link to="/admin/categories" className="admin-nav-button">Категории</Link>
                <Link to="/admin/statuses" className="admin-nav-button">Статусы</Link>
                <Link to="/admin/reviews" className="admin-nav-button">Отзывы</Link>
                <Link to="/admin/services" className="admin-nav-button">Услуги</Link>
            </nav>

        </div>

    );


}

export default Admin;
