import React, { useState, useEffect, Suspense } from 'react';
import Spinner from '../components/Spinner'; // Import the Spinner component

const Card = React.lazy(() => import('../components/Card'));
import RecipeCard from '../components/RecipeCard';

const Explore = () => {
  const [recipes, setRecipes] = useState([]);
  const [menu, setMenu] = useState('All');
  const [pick, setPick] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetch('https://dummyjson.com/recipes');
      const result = await data.json();
      setRecipes(result.recipes);
      console.log(result);
    } catch (error) {
      console.log(`Error found: ${error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePick = (id) => {
    setPick(id);
  };

  const filteredMenu = menu === 'All' ? recipes : recipes.filter((recipe) => {
    return recipe.mealType.includes(menu);
  });

  const menuItems = [
    { label: 'Dinner', value: 'Dinner' },
    { label: 'Breakfast', value: 'Breakfast' },
    { label: 'Lunch', value: 'Lunch' },
    { label: 'Appetizer', value: 'Appetizer' },
    { label: 'Snack', value: 'Snack' },
    { label: 'Dessert', value: 'Dessert' },
    { label: 'Beverage', value: 'Beverage' },
    { label: 'All', value: 'All' }
  ];

  return (
    <div className='w-full p-6 overflow-y-scroll'>
      <div className="w-full h-20 bg-green-900 flex items-center justify-around">
        {
          menuItems.map((menuItem) => (
            <button onClick={() => setMenu(menuItem.value)} key={menuItem.value}
              className={`rounded-md px-4 py-1 transition-all duration-300 ${
                menu === menuItem.value
                  ? 'bg-white text-green-900'
                  : 'bg-transparent hover:bg-white hover:text-green-900 text-white'
              }`}
            >
              {menuItem.label}
            </button>
          ))
        }
      </div>
      <div className='w-full grid grid-cols-3 gap-4'>
        {
          filteredMenu.map((recipe) => (
            <Suspense fallback={<Spinner />} key={recipe.id}>
              <Card handlePick={handlePick} recipe={recipe} />
            </Suspense>
          ))
        }
      </div>
      <div className="mx-auto w-full h-screen bg-white p-2">
        <div className="w-full h-full flex">
          {
            pick === null ? '' :
              recipes.filter((recipe) => recipe.id === pick).map((recipe) => (
                <Suspense fallback={<Spinner />} key={recipe.id}>
                  <Card recipe={recipe} />
                </Suspense>
              ))
          }
        </div>
      </div>
    </div>
  );
}

export default Explore;
