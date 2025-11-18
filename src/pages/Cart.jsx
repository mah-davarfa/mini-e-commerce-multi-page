import {useNavigate} from 'react-router-dom'
export default function Cart (){
const navigate = useNavigate();

const handleCheckout =()=>{
navigate('/checkout')
}

    return(
        <div>
            <h2>Cart</h2>
        <button onClick ={handleCheckout}>check out</button>
    
        </div>
    ) 
}