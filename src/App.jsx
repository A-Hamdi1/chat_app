import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import {BrowserRouter, Routes, Route, Navigate,} from "react-router-dom";
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


function App() {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);
  const ProtectedRoute = ({children}) =>{
    if(!currentUser){
      return <Navigate to="/login"/>
    }
    return children;
  }



  return(
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute>
            <Home/>
            </ProtectedRoute> }/>
          <Route path="Login" element={<Login/>}/>
          <Route path="Register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
