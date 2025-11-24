import {useNavigate ,useLocation, useSearchParams} from 'react-router-dom'
import { sanitizeBasic } from '../utils/sanitize.js';
import { useState, useContext} from 'react';
import {AppContext} from '../context/AppContext.jsx'
export default function NavBar() {
  const {countsOfItems,isLoggedin,currentUser}= useContext (AppContext);
  const [search,setSearch]=useState('');
  const [searchParams,setSearchParams]=useSearchParams()
        
  const navigate = useNavigate();
  const location = useLocation();
  console.log('navbar page location is: ',location);
  

 
     const handleLogin=()=>{
    
    navigate('/login',{state:{from:location.pathname}})
  }
  
  const handleSearchSubmit=(e)=>{
    e.preventDefault()
    const cleanedSearch= sanitizeBasic(search)
    if(!cleanedSearch){
    navigate({pathname:'/', search:''})
    setSearch('')
    return;
   }
   //setSearchParams({q:cleanedSearch})
   navigate({pathname:'/', search:`?q=${cleanedSearch}`})
   setSearch('')
  }

  return (
    <div className='navSkleton'>
      
      <div>
        <p>https://fakestoreapi.com:</p>

      </div>
      <div>
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
        
      </div>
      <div>
        {isLoggedin && currentUser ?
          <p>{currentUser}</p> : ""}
        
        <button onClick={handleLogin}>{isLoggedin?'log out':'log in'} </button>  
        <button onClick={()=>navigate('/cart')}> your cart has {countsOfItems} items</button>
      </div>

    </div>
  );
}
