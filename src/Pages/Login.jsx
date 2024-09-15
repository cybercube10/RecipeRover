import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useFirebase } from '../context/Firebase'
const Login = () => {
  const firebase = useFirebase()
  const [email,setEmail] = useState('')
  const [name,setName] = useState('')
  const navigate = useNavigate()

  useEffect(()=>{
    if (firebase.isLoggedIn){
      navigate("/")
    }
  },[firebase,navigate])

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const res = await firebase.signinUserWithEmailAndPass(email,name)
  }
  return (
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form  onSubmit={handleSubmit}>
       
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
           
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
  
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
           
            class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>
  
        <button
          type="submit"
          class="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          login
        </button>
      </form>
      <p class="text-gray-600 text-sm text-center mt-4">
        Don't have an account?
        <Link to="/signup" class="text-blue-500 hover:underline">Create new</Link>
      </p>
    </div>
  </div>
  )
}

export default Login
