import React, { useState } from 'react';
import { useFirebase } from '../context/Firebase';

const Create = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    readyIn: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    instructions: '',
  });

  // Function to add more ingredient fields
  const addMoreIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: '', amount: '', unit: '' }],
    });
  };

  // Handle input change for recipe fields (like name, readyIn, instructions)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  // Handle ingredient input change
  const handleIngredientChange = (index, e) => {
    const updatedIngredients = recipe.ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [e.target.name]: e.target.value } : ingredient
    );
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const { addRecipe } = useFirebase();

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRecipe(recipe);
      alert('Recipe added successfully!');
      setRecipe({
        name: '',
        readyIn: '',
        ingredients: [{ name: '', amount: '', unit: '' }],
        instructions: '',
      });
      fetchRecipes();
    } 
    catch (error) {
      alert('Failed to add recipe');
    }
  };

  return (
    <div className='w-full h-screen'>
      <form className="max-w-xl mx-auto p-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Recipe Name:</label>
          <input
            name="name"
            value={recipe.name}
            onChange={handleInputChange}
            type="text"
            className="w-full border p-2 outline-emerald-700"
            placeholder="Recipe Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ready in:</label>
          <input
            name="readyIn"
            value={recipe.readyIn}
            onChange={handleInputChange}
            type="text"
            className="w-full border p-2 outline-emerald-700"
            placeholder="Minutes"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Ingredients:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                name="name"
                className="flex-1 border p-2 outline-emerald-700"
                placeholder="Name..."
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                type="text"
                name="amount"
                className="w-20 border p-2 outline-emerald-700"
                placeholder="Amount..."
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, e)}
              />
              <input
                type="text"
                name="unit"
                className="w-20 border p-2 outline-emerald-700"
                placeholder="Unit..."
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, e)}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addMoreIngredient}
            className="text-green-700 border border-green-700 px-2 py-1 rounded mt-2"
          >
            Add more ingredients
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Instructions:</label>
          <textarea
            name="instructions"
            className="w-full border p-2"
            rows="4"
            placeholder="Instructions"
            value={recipe.instructions}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded">
          Add Recipe To Book
        </button>
      </form>
    </div>
  );
};

export default Create;
