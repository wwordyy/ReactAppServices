import './Auth.css'
import { useState } from "react";
import { postRegister } from "../../api/auth";
import { NavLink, useNavigate} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';


function Register () {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);


    try{
        await postRegister({email, password})
        console.log("Успешный вход в систему")

        navigate('/login')
    } catch (err) {
        setError(err.message);
    }
}




    return (

        <div>

            <Dashboard/>


            <div className="register-container">
            <h1>Добро пожаловать</h1>

            <form onSubmit={handleRegister}>
                <label>Email</label>
                <input type="email" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)}/>

            <label>Password</label>
                <input type="password" placeholder="Введите пароль" minLength={5} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

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