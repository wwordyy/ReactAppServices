import { Link, Navigate} from 'react-router-dom';
import DashboardAdmin from '../Dashboard/DashboardAdmin';

function Admin() {

    const roleID = Number(localStorage.getItem('roleID'));


  if (roleID !== 2) {
    return <Navigate to="/" replace />;
  }



    return (
        <div >
          <DashboardAdmin/>

            <nav className="admin-nav">
                <Link to="/admin/categories" className="admin-nav-button">Категории</Link>
                <Link to="/admin/services" className="admin-nav-button">Услуги</Link>
            </nav>

        </div>

    );


}

export default Admin;
