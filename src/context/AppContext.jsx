import {useContext, createContext, useState, useEffect, } from 'react'

export const AppContext = createContext(); 

export default function AppProvider  ({children}){
   
    const [isLoggedin,setIsLoggedin]=useState(false)
    const [wrongPassword,setWrongPassword]= useState(false);
    const [users,setUsers]=useState({});
    const [currentUser,setCurrentUser]=useState('')



   




    return(
        <AppContext.Provider value={{
            wrongPassword,
            isLoggedin,
            currentUser,
           
            setIsLoggedin,
            setWrongPassword,
            users,
            setCurrentUser,
            setUsers,
           
        }}>
            {children}
        </AppContext.Provider>    
    )
} 