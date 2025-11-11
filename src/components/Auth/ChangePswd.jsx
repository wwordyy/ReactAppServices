import { useState } from "react";
import { postChangePassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import './Auth.css'
import Dashboard from "../Dashboard/Dashboard";
import DashboardAdmin from "../Dashboard/DashboardAdmin";


function FormChangePswd () {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [err, setError] = useState(null)
    const navigate = useNavigate();

    
    const roleIdFromStorage = Number(localStorage.getItem('roleID'));


    const handleChange = async (e) => {
        e.preventDefault();
        setError(null);

        try{
            const data = {
                email: email,
                newPassword : password
            }    
            
            await postChangePassword(data) 
            
            alert('Пароль изменен')
            navigate('/login')


        } catch (err) {
            setError(err.message)

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


            <div className="form-change-password" >
              <h1>Смена пароля</h1>

            <form onSubmit={handleChange}>
                
                <label>Email</label>
                <input type="email" placeholder="Введите email" value={email}  required
                onChange={(e) => setEmail(e.target.value)}/>


            <label>Password</label>
            <input type="password" placeholder="Введите пароль" min={5} value={password} required maxLength={49}
                onChange={(e) => setPassword(e.target.value)}
            />

                <br />

                <button type='submit'>Сменить пароль</button>

            </form>

                {err && <div className="error-message" style={{ color: "red", marginTop: "10px" }}>{err}</div>}
        </div>

        </div>
    );
}


export default FormChangePswd;