import './App.css';
import  Register from './components/Auth/Register';
import  Login from './components/Auth/Login';
import  Home from './components/Home/Home';
import Order from './components/Order/Order';
import Admin from './components/Admin/Admin';
import Review from './components/Review/Review';
import Account from './components/Account/Account';
import FormUpdAccount from './components/Account/UpdateForm';
import Payment  from './components/Payment/Payment';

import AdminUser from './components/Admin/Users/User'
import AdminStatus from './components/Admin/Statuses/Status'
import AdminReview from './components/Admin/Reviews/Review'
import AdminService from './components/Admin/Services/Service'
import AdminCategory from './components/Admin/Categories/Category'
import AdminOrder from './components/Admin/Orders/Order';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  
    return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/reviews' element = {<Review/>} />
          <Route path='/personalCabinet' element = {<Account/>}/>
          <Route path='/personalCabinet/updForm' element = {<FormUpdAccount/>} />
          <Route path='/payment' element={<Payment/> } />
          <Route path='/admin' element= {<Admin/>} />
          <Route path='/register' element = {<Register/>} />
          <Route path='/order' element = {<Order/>}/>
        <Route path='/' element={<Home/>}/>


          <Route path='/admin/users'  element = {<AdminUser/>}/>
          <Route path='/admin/categories' element = {<AdminCategory/>}/>
          <Route path='/admin/statuses' element = {<AdminStatus/>}/>
          <Route path='/admin/reviews'  element = {<AdminReview/>}/>
          <Route path='/admin/services' element = {<AdminService/>}/>
          <Route path='/admin/orders' element = {<AdminOrder/>}/>
        </Routes>

      </BrowserRouter>
    </div>
   

    );
}

export default App
