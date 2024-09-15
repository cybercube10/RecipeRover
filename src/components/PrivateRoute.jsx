import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase"; // Adjust the path to your Firebase context

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useFirebase(); // Use the Firebase context to check if the user is logged in

  // If the user is not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Otherwise, render the children (protected route content)
  return children;
};

export default PrivateRoute;



