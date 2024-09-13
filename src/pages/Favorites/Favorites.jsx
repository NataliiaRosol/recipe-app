import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import RecipeItem from "../../components/Navbar/RecipeItem/RecipeItem";




export default function Favorites(){

  const {loading, favoritesList,} = useContext(GlobalContext);

  if(loading){
    return <div>Loading, please wait...</div>
  }

  return (
    <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
      {
        favoritesList && favoritesList.length > 0 ? 
        favoritesList.map(item => <RecipeItem key={item.id} item={item}/>)
        : <div>
          <p className="lg:text-4xl text-xl text-center text-blue-950 font-extrabold mt-28" >Nothing is added</p>
        </div>
      }
    </div>
  )
}