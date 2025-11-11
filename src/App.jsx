import './App.css';
import  Register from './components/Auth/Register';
import  Login from './components/Auth/Login';
import FormChangePswd from './components/Auth/ChangePswd';
import  Home from './components/Home/Home';
import Order from './components/Order/Order';
import Admin from './components/Admin/Admin';
import Review from './components/Review/Review';
import Account from './components/Account/Account';
import FormUpdAccount from './components/Account/UpdateForm';
import Payment  from './components/Payment/Payment';




import AdminService from './components/Admin/Services/Service'
import AdminCategory from './components/Admin/Categories/Category'


import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  
    return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/changePassword' element = {<FormChangePswd/>}/>
          <Route path='/reviews' element = {<Review/>} />
          <Route path='/personalCabinet' element = {<Account/>}/>
          <Route path='/personalCabinet/updForm' element = {<FormUpdAccount/>} />
          <Route path='/payment' element={<Payment/> } />
          <Route path='/admin' element= {<Admin/>} />
          <Route path='/register' element = {<Register/>} />
          <Route path='/order' element = {<Order/>}/>
        <Route path='/' element={<Home/>}/>


          <Route path='/admin/categories' element = {<AdminCategory/>}/>
          <Route path='/admin/services' element = {<AdminService/>}/>
        </Routes>

      </BrowserRouter>
    </div>
   

    );
}

export default App
