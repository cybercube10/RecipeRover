import { createContext,useContext,useEffect, useState } from "react";
import { initializeApp } from "firebase/app";

import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth'

import { getFirestore, collection, addDoc,getDocs, deleteDoc,doc} from 'firebase/firestore';


const FirebaseContext = createContext(null)

const firebaseConfig = {
  apiKey: "AIzaSyBenkZE7_V0NFq-lhpu4vhIyLely-rHErg",
  authDomain: "cookbook-d17e0.firebaseapp.com",
  projectId: "cookbook-d17e0",
  storageBucket: "cookbook-d17e0.appspot.com",
  messagingSenderId: "885308061338",
  appId: "1:885308061338:web:19544959d36e5e419bd123"
};

export const useFirebase = () => useContext(FirebaseContext)


export const FirebaseProvider = (props)=>{
  const firebaseapp = initializeApp(firebaseConfig)
const firestore = getFirestore(firebaseapp);
const firebaseAuth = getAuth(firebaseapp)

const [recipesList, setRecipesList] = useState([]);

const fetchRecipes = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'recipes'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setRecipesList(data);
  } catch (error) {
    console.error('Error fetching recipes: ', error);
  }
};

useEffect(() => {
  fetchRecipes();
}, []);


  const signupUserWithEmailAndPassword = (email,password) =>{
  return  createUserWithEmailAndPassword(firebaseAuth,email,password)
  }
  const signinUserWithEmailAndPass = (email,password)=>{
    return signInWithEmailAndPassword(firebaseAuth,email,password)
  }
  const[user,setUser] = useState(null)

useEffect (()=>{
  onAuthStateChanged(firebaseAuth,(user)=>{
  if(user){setUser(user)}
  else{setUser(null)}
  })
})
const isLoggedIn = user ?  true : false
const isSignedUp = user ? true : false

const addRecipe = async (recipe) => {
  try {
    await addDoc(collection(firestore, 'recipes'), recipe);
  } catch (error) {
    console.error('Error adding recipe: ', error);
    throw error;
  }
};

const deleteRecipe = async (id) => {
  try {
    await deleteDoc(doc(firestore, 'recipes', id));
  } catch (error) {
    console.error('Error deleting recipe: ', error);
    throw error;
  }
};



  return <FirebaseContext.Provider value={{signupUserWithEmailAndPassword,signinUserWithEmailAndPass,isLoggedIn,isSignedUp, addRecipe,recipesList,deleteRecipe}}>{props.children}</FirebaseContext.Provider>
}

