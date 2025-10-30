import { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { getUserById, putUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import './UpdateForm.css'

function FormUpdAccount() {

    const userID = localStorage.getItem("userID")
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [userData, setUserData] = useState({
        ID_user: "",
        user_email: "",
        user_password: "",
        role_ID: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        phone: ""
    });


    useEffect(() => {
        async function fetchUser() {
            const data = await getUserById(userID);

            if (data.user) {
                setUserData(data.user);

            }
                
            
        }
        fetchUser()
    }, [] )


      const handleChange = (e) => {

        const { name, value } = e.target;

        setUserData((prev) => ({
        ...prev,
        [name]: value
        }));
         };

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");

            if (newPassword !== confirmPassword) {
                setError("Пароли не совпадают");
                return;
            }

              const updatedData = {
                firstName: userData.first_name,
                lastName: userData.last_name,
                middleName: userData.middle_name,
                phone: userData.phone,
                email: userData.user_email,
                isPasswordUpd: newPassword.trim() !== "",
                password: newPassword.trim() !== "" ? newPassword : undefined,
            };

            await putUser(updatedData, userID);

            navigate('/personalCabinet')
            
        };


    return (
        <div>

            <Dashboard/>

            <div className="wrapper-h2">
                <h2>Обновление профиля</h2>
            </div>

            <div className='account-container'>
            
              <form style={{maxWidth: 400, margin: "auto"}} onSubmit={handleSubmit}>
           
                    <div>
                        <label>Email:</label>
                        <input type="email" name="user_email"  value={userData.user_email} onChange={handleChange} />
                    </div>
                
                    <div>
                        <label>Имя:</label>
                        <input 
                        type="text" name="first_name" value={userData.first_name} onChange={handleChange}
                        required 
                        />
                    </div>
                    <div>
                        <label>Фамилия:</label>
                        <input 
                        type="text"  name="last_name" value={userData.last_name} onChange={handleChange}
                        required 
                        />
                    </div>
                    <div>
                        <label>Отчество:</label>
                        <input 
                        type="text" name="middle_name" value={userData.middle_name || ""} onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label>Телефон:</label>
                        <input 
                        type="tel" name="phone" value={userData.phone} onChange={handleChange}
                        required 
                        />


                        <div>
                    <label>Новый пароль:</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Введите новый пароль"/>
                    </div>

                    <div>
                    <label>Подтвердите пароль:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Подтвердите новый пароль"/>
                    </div>

                        {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>


                    <button type="submit">Сохранить</button>


                    
                </form>

                </div>
        </div>

    );

}


export default FormUpdAccount;