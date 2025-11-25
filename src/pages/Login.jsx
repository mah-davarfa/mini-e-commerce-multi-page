import { useNavigate, useLocation,Navigate,useSearchParams} from "react-router-dom"
import {useContext ,useState} from 'react'
import { AppContext } from "../context/AppContext";
import { sanitizeBasic } from '../utils/sanitize.js';
export default function Login (){
    const {
    isLoggedin,wrongPassword,
    setUsers,users,setWrongPassword,
    setIsLoggedin,setCurrentUser }= useContext(AppContext)
    const [searchParams,setSearchParams]= useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from|| '/';
    console.log('login page location is: ',location);
    const [password, setPassword] = useState("");
    
//sanitizeBasic(searchParams.get('user'))||""
        
        const readName = sanitizeBasic(searchParams.get("user")||"").toLowerCase().trim();
        const handleSubmit=(e)=>{
            e.preventDefault();
             if (!readName) return;
            
            checkUserIfExist(readName, password); // use the fresh local value
        }
 
    const checkUserIfExist=(logedInName,password)=>{
       
        if (!users[logedInName]){//user not exist create new user
            setUsers(perUser=>({
                ...perUser,
                [logedInName]:{password:password, id:Date.now()}
            }))
         
            setWrongPassword(false)
            setIsLoggedin(true)
            setCurrentUser(logedInName)
            setSearchParams({});  
            navigate(from ,{replace:true})
        }else if (users[logedInName].password===password){//user exist and password correct
            setWrongPassword(false)
            setSearchParams({});  
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
                type="text"
                value={readName}
                placeholder="User Name"
                required
                autoFocus
                autoCapitalize="none"
                spellCheck={false}
                autoComplete="username"
                onChange={(e)=> {setSearchParams({ user: e.target.value}); 
                 }}/>  
                <input
                type='password'
                value={password}
                placeholder="Password"
                required
                onChange={(e)=>setPassword(e.target.value)}
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