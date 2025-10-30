import { useEffect, useState } from "react";
import { getCategories } from "../../api/categories";


function Aside({onCategoriesChange})
{
    const [categories, setCategories] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);

        const initialChecked = {};
        response.data.forEach(category => {
          initialChecked[category.id_category] = false;
        });

        setCheckedCategories(initialChecked);
        onCategoriesChange([])

      } catch (error) {
        console.error("Не удалось загрузить категории", error);
      }
    };

    fetchCategories();
  }, []); 

    const handleCheckboxChange = (id) => {
      
    setCheckedCategories(prev => {
      const updated = { ...prev, [id]: !prev[id] }

      const selectedIds = Object.keys(updated).filter(key => updated[key])
      onCategoriesChange(selectedIds)
      console.log("Выбранные категории:" + selectedIds)
      return updated
    });

  };


     return (
    <aside style={{
        borderRight: "1px solid #4c4c4cff", 
        padding: "10px", 
        maxWidth: "115px"
        }}>
      <h3>Категории</h3>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        
        {categories.map(cat => (
          <li key={cat.id_category}>
            <label>
              <input 
                type="checkbox" 
                checked={!!checkedCategories[cat.id_category]} 
                onChange={() => handleCheckboxChange(cat.id_category)} 
              />
              {cat.title}
            </label>
          </li>
        ))}

        
      </ul>
    </aside>
  );
}

export default Aside;