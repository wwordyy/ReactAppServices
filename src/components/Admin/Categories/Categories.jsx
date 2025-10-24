import { useState } from "react";
import { postCategories } from "../../../api/categories";


function Categories()
{
    const [title, setTitle] = useState('')

    const handleSubmit = async (e) => {

        e.preventDefault();
        
        const data = {'title': title}
        await postCategories(data)

        alert("Категория добавлена!")

        setTitle('')

    }


    return (
        <div>
            <h2>Создать категорию</h2>
            <form onSubmit={handleSubmit}>
                <label>Категория</label>
                <input type="text" placeholder="Введите назание категории" 
                    required minLength={3} 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}/>
                
                <button type="submit">Создать категорию</button>
            </form>

        </div>

    );

}

export default Categories;