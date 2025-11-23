import { useNavigate, useLocation,Navigate} from "react-router-dom"
import {useContext ,useState} from 'react'
import { AppContext } from "../context/AppContext";

export default function Login (){
    const {
    currentUser,isLoggedin,wrongPassword,
    setUsers,users,setWrongPassword,
    setIsLoggedin,setCurrentUser }= useContext(AppContext)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from|| '/';
    console.log('login page location is: ',location);
    const [password, setPassword] = useState("");
    const [userName,setUserName]=useState('')

        const handleSubmit=(e)=>{
            e.preventDefault();
            checkUserIfExist(userName,password)
        }
 
    const checkUserIfExist=(logedInName,password)=>{
       
        if (!users[logedInName]){//user not exist create new user
            setUsers(perUser=>({
                ...perUser,
                [logedInName]:{password:password, id:Date.now()}
            }))
    console.log('users :', users)        
            setWrongPassword(false)
            setIsLoggedin(true)
            setCurrentUser(logedInName)
    console.log('current user:', logedInName)        
            navigate(from ,{replace:true})
        }else if (users[logedInName].password===password){//user exist and password correct
            setWrongPassword(false)
            setIsLoggedin(true)
           setCurrentUser(logedInName)
            navigate(from ,{replace:true})
        }else{//user exist but password wrong
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
                value={userName}
                placeholder="User Name"
                required
                onChange={(e)=>setUserName(e.target.value.trim())}
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
            {wrongPassword? <p>Wrong user name or Password Try Again</p>: ''}
        </div>
    ): <Navigate to={from} />
    
)}
//usersCart = {
      //   userId1: { itemId1: {...}, itemId2: {...} }, object.entries-> [[itemId1,{...}],[itemId2,{...}]]
     //   userId2: { ... },
     // }
     ///////////////////////////
     //cart = [{item:id,quatity: number,price:number,titl:name,image},..]
     ////////////////