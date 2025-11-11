import './Auth.css'
import { useState } from "react";
import { postRegister } from "../../api/auth";
import { Navigate, NavLink, useNavigate} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';


function Register () {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);

    
    const roleIdFromStorage = Number(localStorage.getItem('roleID'));


        
    if (roleIdFromStorage === 2) {
        return <Navigate to="/admin" replace />;
    }



    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);


        if (!/^\d{11}$/.test(phone)) {
        setError("Номер телефона должен содержать ровно 11 цифр");
        return;
        }

        const data  = {
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            phone: phone,
            email: email,
            password: password

        }

        try{
            await postRegister(data)
            console.log("Успешный вход в систему")

            navigate('/login')
        } catch (err) {
            setError(err.message);
        }
    }
    
    return (

        <div>

            
        {roleIdFromStorage === 1 ? (
            <Dashboard />
            ) : roleIdFromStorage === 2 ? (
            <DashboardAdmin />
            ) : (
            <Dashboard />
            )}


            <div className="register-container">
            <h1>Добро пожаловать</h1>

            <form onSubmit={handleRegister}>

                <label>Имя</label>
                <input type="text" placeholder="Введите имя" minLength={2} maxLength={49} value={firstName} required
                    onChange={(e) => setFirstName(e.target.value)}/>

                
                <label>Фамилия</label>
                <input type="text" placeholder="Введите фамилию" minLength={2} maxLength={49} value={lastName} required
                    onChange={(e) => setLastName(e.target.value)}/>

                <label>Отчество</label>
                <input type="text" placeholder="Введите отчество (если оно есть)"  maxLength={49} value={middleName} 
                    onChange={(e) => setMiddleName(e.target.value)}/>

                <label>Телефон</label>
                <input type="text" placeholder="Введите номер телефона" minLength={11} maxLength={11} value={phone} required
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, '');
                        setPhone(onlyNums);
                    }}/>



                <label>Email</label>
                <input type="email" placeholder="Введите email" value={email} required
                    onChange={(e) => setEmail(e.target.value)}/>

                <label>Пароль</label>
                <input type="password" placeholder="Введите пароль" minLength={5} value={password} required maxLength={49}
                    onChange={(e) => setPassword(e.target.value)}/>

                

                <NavLink to={'/login'}>Авторизация</NavLink>
                <br />

                <button type='submit'>Зарегистрироваться</button>

            </form>

                {error && <div className="error-message" style={{ color: "red", marginTop: "10px" }}>{error}</div>}
            </div>
        </div>

    );

}

export default Register;