import { createContext, useState } from "react";


export const GlobalContext = createContext(null);

export default function GlobalState({children}){
  const [searchParam, setSearchParam] = useState('');
  const [loading, setLoading] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [recipeDetailsData, setRecipeDetailsData] = useState(null);
  const [favoritesList, setFavoruritesList] = useState([])

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`);
      const data = await response.json();

      if(data?.data?.recipes ){
        setRecipeList(data?.data?.recipes);
        setLoading(false);
        setSearchParam('')
      }
      
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSearchParam('')
    }
  }

  function handleAddToFavorites(currentItem){
    // console.log(currentItem);
    let copyFavoritesList = [...favoritesList];
    const index = copyFavoritesList.findIndex(item => item.id === currentItem.id);

    if(index === -1){
      copyFavoritesList.push(currentItem)
    }
    else {
      copyFavoritesList.splice(index, 1)
    }
    setFavoruritesList(copyFavoritesList)
    
    
  }

  return <GlobalContext.Provider value={{
      searchParam, 
      loading, 
      recipeList, 
      setSearchParam, 
      handleSubmit, 
      recipeDetailsData, 
      setRecipeDetailsData,
      handleAddToFavorites,
      favoritesList
      }}>
    {children}
    </GlobalContext.Provider>
}