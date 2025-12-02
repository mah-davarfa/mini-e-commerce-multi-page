import {useNavigate ,useLocation, useSearchParams,NavLink} from 'react-router-dom'
import { sanitizeBasic } from '../utils/sanitize.js';
import { useState, useContext} from 'react';
import {AppContext} from '../context/AppContext.jsx'

export default function NavBar() {
  const {countsOfItems,isLoggedin,currentUser,
    setIsLoggedin,setCurrentUser,
  setTheme,theme}= useContext (AppContext);

  const [search,setSearch]=useState('');
  // const [searchParams,setSearchParams]=useSearchParams()
        
  const navigate = useNavigate();
  const location = useLocation();
  console.log('navbar page location is: ',location);
  
  const changeTheme= ()=>{
   setTheme(theme==='light'?'dark':'light')
  }
 
     const handleLogin=()=>{
      navigate('/login',{state:{from:location.pathname}})
  }

  const handleLogout=()=>{
    setIsLoggedin(false);
    setCurrentUser('');
    navigate('/',{replace:true});
  }

  const handleSearchSubmit=(e)=>{
    e.preventDefault()
    const cleanedSearch= sanitizeBasic(search)
    if(!cleanedSearch){
    //navigate({pathname:'/', search:''})
    // setSearchParams({}) //clean the url search params
    setSearch('')
    return;
   }
  //  setSearchParams({q:cleanedSearch})
   navigate({pathname:'/', search:`?q=${cleanedSearch}`})
   setSearch('')
  }

  return (
    <div className='navSkeleton'>
      <div>
        <button onClick={changeTheme}>{theme==='light'?'Dark':'Light'}</button>
      </div>
      <div>
        <p>https://fakestoreapi.com</p>

      </div>
      
        <form
          onSubmit={handleSearchSubmit}
        >
          <input
          type="text"
          value={search}
          required
          onChange={(e)=>setSearch(e.target.value.trim())}
          >
          </input>
          <button
          type='submit'
          >
            Search
          </button>
        </form>
        
      
      <div className="navBtLg">
        {isLoggedin && currentUser ?
          <p>{currentUser}</p> : ""}
        
        <button onClick={isLoggedin? handleLogout: handleLogin}>{isLoggedin?'log out':'log in'} </button>  
        <NavLink to = "/cart" className ={({isActive})=>isActive? 'Active': undefined}>Cart Itemes: {countsOfItems}</NavLink>
      </div>

    </div>
  );
}
