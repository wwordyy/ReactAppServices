import Dashboard from '../Dashboard/Dashboard';
import './Admin.css'
import Categories from './Categories/Categories';
import Coupons from './Coupons/Coupons';


function Admin() {
    return (
        <div >
            <Dashboard/>

        <div className='block-content'>
            
                <Coupons/>

                <Categories/>

        </div>

        </div>

    );


}

export default Admin;
