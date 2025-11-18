import {useNavigate ,useLocation} from 'react-router-dom'


export default function NavBar() {
  const navigate = useNavigate();
 const location = useLocation();
console.log('navbar page location is: ',location);
const isLogin = false;

  const handleLogin=()=>{
    
    navigate('/login',{state:{from:location.pathname}})
  }

  return (
    <div className='navSkleton'>
      
      <div>
        <p>Logo</p>

      </div>
      <div>
        <form>
          <input></input>
          <button>Search</button>
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
