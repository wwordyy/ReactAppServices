import './App.css';
import  Register from './components/Auth/Register';
import  Login from './components/Auth/Login';
import  Home from './components/Home/Home';
import Order from './components/Order/Order';
import Admin from './components/Admin/Admin';
import Payment  from './components/Payment/Payment';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  // window.onbeforeunload = () => {
  //   localStorage.clear();

  // }

    return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path='/login' element = {<Login/>}/>
          <Route path='/payment' element={<Payment/> } />
          <Route path='/admin' element= {<Admin/>} />
          <Route path='/register' element = {<Register/>} />
          <Route path='/order' element = {<Order/>}/>
        <Route path='/' element={<Home/>}/>
        </Routes>

      </BrowserRouter>
    </div>
   

    );
}

export default App
