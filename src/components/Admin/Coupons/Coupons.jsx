import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../api/users';
import { postCoupons } from '../../../api/coupons';


function Coupons() {


  const [couponCode, setCouponCode] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [isPersonal, setIsPersonal] = useState(false);
  const [userID, setUserID] = useState(''); 
  const [users, setUsers] = useState([])

  useEffect(() => {
     async function fetchUsers() {
        const response = await getAllUsers();
        console.log('USERS: ' + response.data)
        setUsers(response.data)
     }
     fetchUsers();
  }, [])






  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const couponData = {
      coupon_code: couponCode,
      discount_value: parseFloat(discountValue),
      is_personal: isPersonal,
      user_ID: userID === '' ? null : userID,
    };
    console.log('Отправка данных купона:', couponData);

    await postCoupons(couponData);

    alert("Купон добавлен");
    setCouponCode(0)
    setDiscountValue(0)
    setIsPersonal(false)
    setUserID("")
  };




  return (

    <div className='wrapper-coupons'>

      <h2>Создать купон</h2>
        <form onSubmit={handleSubmit}>
        <label>Код купона:</label>
        <input 
            type="text" 
            value={couponCode} 
            required
            onChange={(e) => setCouponCode(e.target.value)} 
        />

        <label>Значение скидки:</label>
        <input 
            type="number" 
            step="0.01" 
            value={discountValue} 
            required
            onChange={(e) => setDiscountValue(e.target.value)} 
        />

        <label>Персональный:</label>
        <input 
            type="checkbox" 
            checked={isPersonal} 
            onChange={(e) => setIsPersonal(e.target.checked)} 
        />

        <label>Пользователь (если персональный):</label>
        <select 
            value={userID} 
            onChange={(e) => {
                console.log("select changed: ", e.target.value);
                setUserID(e.target.value)
            }} 
            disabled={!isPersonal}
        >
            <option value="">Не выбран</option>
                {users.map(user => (
                <option key={user.id_user} value={String(user.id_user)}>{user.user_email}</option>
            ))}
        </select>

        <button type="submit">Создать купон</button>
        </form>
    </div>
  );
}

export default Coupons;
