import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'

import RecipeCard from './RecipeCard'
const RecipeContainer = () => {
  const { id } = useParams(); // Get the recipe id from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/recipes/${id}`); // Fetch recipe data using the id
        const data = await response.json()
        setRecipe(data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Failed to load recipe');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <RecipeCard recipe={recipe} id={id} />
    </div>
  )
}

export default RecipeContainer
