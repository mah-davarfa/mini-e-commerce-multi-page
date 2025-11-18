import { useNavigate, useLocation,Navigate} from "react-router-dom"
import {useContext ,useState} from 'react'
import { AppContext } from "../context/AppContext";

export default function Login (){
    const {
    currentUser,isLoggedin,wrongPassword,
    setUsers,users,setWrongPassword,
    setIsLoggedin,setCurrentUser }= useContext(AppContext)

    const navigat = useNavigate();
    const location = useLocation();
    const from = location.state?.from|| '/';
    console.log('login page location is: ',location);
    const [password, setPassword] = useState("");


        const handleSubmit=(e)=>{
            e.preventDefault();
            checkUserIfExist(currentUser,password)
        }
 
    const checkUserIfExist=(currentUser,password)=>{
       
        if (!users[currentUser]){
            setUsers(per=>({
                ...per,
                [currentUser]:{password}
            }))
    console.log('users :', users)        
            setWrongPassword(false)
            setIsLoggedin(true)
            
    console.log('current user:', currentUser)        
            navigat(from ,{replace:true})
        }else if (users[currentUser].password===password){
            setWrongPassword(false)
            setIsLoggedin(true)
           
            navigat(from ,{replace:true})
        }else{
            setWrongPassword(true);
            setIsLoggedin(false);
            }
        }

    return(
        (!isLoggedin)?(
        <div>
            <form 
             onSubmit={handleSubmit}>
                <input
                type='text'
                value={currentUser}
                placeholder="User Name"
                required
                onChange={(e)=>setCurrentUser(e.target.value.trim())}
                />  
                <input
                type='password'
                value={password}
                placeholder="Password"
                required
                onChange={(e)=>setPassword(e.target.value.trim())}
                />   
                <button type='submit'>submit</button>          
            </form>
            {wrongPassword? <p>Wrong Password Try Again</p>: ''}
        </div>
    ): <Navigate to={from} />
    
)}