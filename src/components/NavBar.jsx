import {useNavigate ,useLocation, useSearchParams} from 'react-router-dom'

import { useState } from 'react';

export default function NavBar() {
  const [search,setSearch]=useState('');
  const [searchParams,setSearchParams]=useSearchParams()
  const  query = searchParams.get("q")|| '';
      
  const navigate = useNavigate();
  const location = useLocation();
  console.log('navbar page location is: ',location);
  const isLogin = false;
  
 
     const handleLogin=()=>{
    
    navigate('/login',{state:{from:location.pathname}})
  }
  
  const handleSearchSubmit=(e)=>{
    e.preventDefault()
    setSearchParams({q:search})
    setSearch('')
   
  }
  return (
    <div className='navSkleton'>
      
      <div>
        <p>Logo</p>

      </div>
      <div>
        <form
          onSubmit={handleSearchSubmit}
        >
          <input
          type="text"
          value={search}
          required
          onChange={(e)=>setSearch(e.target.value)}
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
        <p>Profile</p>
        <button onClick={handleLogin}>{isLogin?'log out':'log in'} </button>  
        <button onClick={()=>navigate('/cart')}> cart</button>
      </div>

    </div>
  );
}
