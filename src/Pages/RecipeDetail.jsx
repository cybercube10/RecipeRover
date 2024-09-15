
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipesList } = useFirebase();
  const recipe = recipesList.find((r) => r.id === id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className='w-full h-full p-4 text-center h-full' style={{
      backgroundImage: `url('/public/poster.jpeg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',

    }} >
      <h1 className='text-4xl font-bold  mb-2'>{recipe.name}</h1>
      <p><strong>Ready in:</strong> {recipe.readyIn} minutes</p>
      <h2 className='font-semibold mt-2 text-2xl'>Ingredients:</h2>
      <ul className='list-disc ml-4'>
        {recipe.ingredients.map((ingredient, idx) => (
          <li key={idx}>
            {ingredient.amount} x {ingredient.unit} of {ingredient.name}
          </li>
        ))}
      </ul>
      <h2 className='font-semibold mt-2 text-2xl'>Instructions:</h2>
      <p>{recipe.instructions}</p>
    </div>
  );
};

export default RecipeDetail;
