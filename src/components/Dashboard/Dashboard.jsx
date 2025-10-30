import { NavLink } from 'react-router-dom';
import './Dashboard.css'


function Dashboard()
{

    const roleId = localStorage.getItem('roleID');


    return (
         <div>
            <ul className="dashboard-menu">
                <li>
                    <NavLink
                        to="/order"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }>
                        Заказ
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }>
                        Войти
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }>
                        Главная
                    </NavLink>

                </li>

                
                <li>
                       {roleId != null ? (<NavLink
                        to="/reviews"
                        className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                        }
                       >
                        Отзывы
                       </NavLink>) : ""} 

                </li>


                <li>
                       {roleId != null ? (<NavLink
                        to="/personalCabinet"
                        className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                        }
                       >
                        Аккаунт
                       </NavLink>) : ""} 

                </li>
               

                <li>
                    {roleId == 2 ? (<NavLink
                    to="/admin"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }>
                    Админка
                    </NavLink>) : ""}
                </li>
            </ul>
        </div>
    );
}

export default Dashboard;