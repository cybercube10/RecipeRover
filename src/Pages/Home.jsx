import React from 'react';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const {recipesList,deleteRecipe} = useFirebase()
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/myrecipe/${id}`);
  };


  const handleDelete = async (id) => {
    try {
      await deleteRecipe(id);     
      alert('Recipe deleted successfully!');
      fetchRecipes();
  
    } catch (error) {
      alert('Failed to delete recipe');
    }
  };

  

  return  (
    <div className='w-full px-4'>
      <div className='h-14 flex items-center w-full bg-green-800 relative'>
        <div className='relative mx-auto'>
          <input className='px-6 py-2 rounded-lg outline-emerald-600' type="text" placeholder='search here..' />
          <button className="absolute right-2 top-2 text-green-800"><i className="ri-search-line"></i></button>
        </div>
      </div>
      <div className='w-full'>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4'>
          {recipesList.map(recipe => (
            <div key={recipe.id} className='relative border p-4 rounded shadow-md text-center flex flex-col justify-between'
              style={{
                backgroundImage: `url('/public/poster.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '300px',
                aspectRatio: '1',
              }}
              onClick={() => handleClick(recipe.id)}
            >
              <button onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(recipe.id);
                }} className='absolute right-2 rounded-lg bg-orange-400 text-white p-1 border '><i class="ri-delete-bin-5-line"></i></button>
              <div>
                <h2 className='text-xl font-bold mb-2'>{recipe.name}</h2>
                <p><strong>Ready in:</strong> {recipe.readyIn} minutes</p>
                <h3 className='font-semibold mt-2'>Ingredients:</h3>
                <ul className='list-disc ml-4'>
                  {recipe.ingredients.map((ingredient, idx) => (
                    <li key={idx}>
                      {ingredient.amount} x {ingredient.unit} of {ingredient.name}
                    </li>
                  ))}
                </ul>
              </div>
              <button className='bg-green-500 text-white px-4 py-2 rounded mt-auto'>
                Read
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
