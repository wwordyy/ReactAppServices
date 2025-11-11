import { NavLink, useNavigate } from 'react-router-dom';
import './Dashboard.css'


function DashboardAdmin(){


    const navigate = useNavigate();

    const handleButton = () => {

        navigate('/login')
        localStorage.clear();

    }

    return (
      <div>
            <ul className="dashboard-menu">
                


   
                <li>
                    <NavLink
                        to="/admin"
                        className= "nav-link">
                        Админка
                    </NavLink>

                </li>

            </ul>

            
            <div style={{display: 'flex', justifyContent: 'end'}}>
                    <button onClick={handleButton} style={{
                background: 'brown',
                color: 'white',
                margin: '10px'
                }}>Выйти</button>
            </div>
    </div>
    );

}


export default DashboardAdmin;