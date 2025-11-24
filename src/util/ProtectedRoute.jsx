
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import {useContext} from 'react'

export default function ProtectedRoute({ children }) {
  const {isLoggedin} = useContext(AppContext);
    const location = useLocation();
    console.log('protected rout location',location);

      


      if(!isLoggedin){
        
      return <Navigate to='/login' state={{from:location.pathname}} replace/>
      }
      return children;
    }
