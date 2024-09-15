import React from 'react'

const RecipeCard = ({recipe,id}) => {
  
  return (
    <div key={id} className='grid grid-cols-2 p-2 '>
       <img className='h-full' src={recipe.image} alt="" />
       <div className='p-2 m-2 '>
        
        <h1 className='font-bold text-4xl mb-4'>{recipe.name}</h1>

        

        <h1 className='font-semibold '>Ingredients:</h1>
         {recipe.ingredients && recipe.ingredients.map((item,id)=><li key={id} className='font-mono  mb-4'><i>{`${item.replace(',','-')}`}</i></li>)}
         
        <h2 className='font-semibold'>Preparation Duration</h2>
         <h3 className='font-mono mb-4'>{recipe.prepTimeMinutes} minutes</h3>

         <h1 className='font-semibold '>Instructions:</h1>
        {recipe.instructions && recipe.instructions.map((item,id)=><li key={id} className='font-mono'>{`${item}`}</li>)}
       </div>
    </div>
  )
}

export default RecipeCard
