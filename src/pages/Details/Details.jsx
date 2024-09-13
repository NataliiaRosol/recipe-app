import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { GlobalContext } from "../../context/GlobalContext";




export default function Details(){

  const {id} = useParams();
  const {recipeDetailsData, setRecipeDetailsData, handleAddToFavorites, favoritesList} = useContext(GlobalContext)
  // console.log(params);
  
  useEffect(()=>{
    async function getrecipeDetails() {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
      const data = await response.json();
      
      if(data.data){
        setRecipeDetailsData(data.data)
      }
      
    }
    getrecipeDetails()
  },[]);

  // console.log(recipeDetailsData?.recipe?.ingredients);

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="max-w-lg h-96 overflow-hidden rounded-xl group">
          <img src={recipeDetailsData?.recipe?.image_url} alt={recipeDetailsData?.recipe?.title} className="w-full h-full object-cover block group-hover:scale-105 duration-300" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm text-blue-900 font-medium">{recipeDetailsData?.recipe?.publisher}</span>
        <h3 className="font-bold text-2xl truncate text-blue-950">{recipeDetailsData?.recipe?.title}</h3>

        <div>
          <button className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-blue-950 text-white"
          onClick={()=>handleAddToFavorites(recipeDetailsData?.recipe)}
          >
            {
              favoritesList.findIndex((item) => item.id === recipeDetailsData?.recipe?.id) !== -1 ? 'Remove from favorites' : 'Save as favourites'
            }
            </button>
        </div>

        <div className="mt-3">
          <span className="text-2xl font-semibold text-black">Ingredients: </span>
          <ul className="flex flex-col gap-3 mt-3">
            {
              recipeDetailsData?.recipe?.ingredients.map(item => <li key={item.description}>
                <span className="text-xl font-semibold text-black">{item.quantity} {item.unit} </span>
                <span className="text-xl font-semibold text-blue-950">{item.description}</span>
              </li>)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}