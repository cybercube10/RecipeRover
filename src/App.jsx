import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Create from './Pages/Create';
import Home from './Pages/Home';
import Favourite from './Pages/Favourite';
import RecipeContainer from './components/RecipeContainer';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import RecipeDetail from './Pages/RecipeDetail';
import PrivateRoute from './components/PrivateRoute';

// Lazy load the Explore component
const Explore = React.lazy(() => import('./Pages/Explore'));

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/Create' element={<PrivateRoute><Create /></PrivateRoute>} />
        <Route
          path='/Explore'
          element={
            <PrivateRoute>
              <Suspense fallback={<div>Loading...</div>}>
                <Explore />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route path='/favs' element={<PrivateRoute><Favourite /></PrivateRoute>} />
        <Route path='/recipe/:id' element={<PrivateRoute><RecipeContainer /></PrivateRoute>} />
        <Route path='/myrecipe/:id' element={<PrivateRoute><RecipeDetail /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
