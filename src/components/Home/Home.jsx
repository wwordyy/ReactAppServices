import { Navigate } from "react-router-dom";
import Aside from "../AsideCategories/Aside";
import Catalog from "../Catalog/Catalog";
import Dashboard from "../Dashboard/Dashboard";
import { useState } from "react";

function Home()
{

      const roleID = Number(localStorage.getItem('roleID'));


    if (roleID === 2) {
        return <Navigate to="/admin" replace />;
    }
     const [selectedCategories, setSelectedCategories] = useState([])

  return (
    <div style={{ display: "flex"}}>

      <Aside onCategoriesChange={setSelectedCategories}/>

      <main>

        <Dashboard />
        <Catalog selectedCategoryIds={selectedCategories}/>
        
      </main>
    </div>
  );
}

export default Home;