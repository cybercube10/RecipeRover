import React from 'react'
import { Link } from 'react-router-dom';

const Card = ({handlePick,recipe}) => {

  const handleClick = () => {
    console.log('Card clicked with recipe ID:', recipe.id);
    handlePick(recipe.id);
  };

  return (
  <Link to={`/recipe/${recipe.id}`}>
    <div onClick={handleClick} className='w-[300]px h-[200]px border border-green-900 rounded-md p-2 my-4  '>
    <div>
    <img className='w-full rounded-lg' src={recipe.image} alt="" />
        <h1 className='font-bold'>{recipe.name}</h1>
        <h2>Cooking Time: {recipe.prepTimeMinutes}min</h2>
        <h3 className='bg-green-300'> {`${recipe.tags}`}</h3>
        <button><i class="ri-heart-line"></i></button>
    </div>
    </div>
  </Link>

  )
}

export default Card
