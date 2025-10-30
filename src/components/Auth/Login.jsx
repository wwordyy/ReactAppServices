import './Auth.css'
import { postLogin } from '../../api/auth';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';



function Login () {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [err, setError] = useState(null)


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);


        try{
            const response = await postLogin({email, password})

            localStorage.setItem('orderID', response.orderID)
            localStorage.setItem('roleID', response.roleID)
            localStorage.setItem('userID', response.userID)
            console.log("Успешный вход в систему")


            navigate('/')
        } catch (err) {
            setError(err.message);
        }
    }


    return (

        <div>
            <Dashboard/>

            <div className="login-container">


            <h1>Добро пожаловать</h1>

            <form onSubmit={handleLogin}>
                
                <label>Email</label>
                <input type="email" placeholder="Введите email" value={email}  required
                onChange={(e) => setEmail(e.target.value)}/>


            <label>Password</label>
            <input type="password" placeholder="Введите пароль" min={5} value={password} required
                onChange={(e) => setPassword(e.target.value)}
            />

                <NavLink to={'/register'}>Регистрация</NavLink>
                <br />

                <button type='submit'>Войти</button>

            </form>

                {err && <div className="error-message" style={{ color: "red", marginTop: "10px" }}>{err}</div>}
            </div>
    </div>

    );

}

export default Login;