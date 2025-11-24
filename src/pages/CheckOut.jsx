import { useState,useContext,useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {AppContext} from '../context/AppContext.jsx'

export default function CheckOut (){
    const {usersCart,setUsersCart,users,currentUser}= useContext(AppContext);
   const [isCheckOutClicked, setIsCheckOutClicked]= useState (false);
   const navigate = useNavigate();

    const timerRef =useRef(null);

   let items = [];
    const userId= users[currentUser]?.id;
    const userCarts = usersCart[userId] || {} ;
    items =  Object.entries(userCarts);

   const handleCheckOut =()=>{
    if(isCheckOutClicked) return;
        setIsCheckOutClicked (true);
        setUsersCart((preUsersCart)=>{
                const{[userId]:_removed , ...restOfUsers}= preUsersCart;
                return restOfUsers;
            })
            if(timerRef.current){
                clearTimeout(timerRef.current);
                timerRef.current=null;
            }
        timerRef.current=setTimeout(()=>{
            navigate('/',{ replace: true });
            setIsCheckOutClicked(false);
        
        },2000)
   }
   useEffect(()=>{
        return()=>{
            if(timerRef.current){
                clearTimeout(timerRef.current)
                timerRef.current=null;
            }
         }
            
   },[])

    return(
        <div>
            {isCheckOutClicked ?(
             <div>
                    <h2>Because we don't have backEnd set up,
                        <br/>then we can not get your payment information,<br/>
                         then you purchase is free of charge</h2>
                         
                    <p>Thanks for your purchase</p>
             </div>
            ):(
            <div>
                <h3>items to checkout</h3>
                {items.map(([itemId,item] )=>
                <div key={itemId}>
                <p >{item.title}</p>
                <img src={item.image} alt={item.title} width="50px" />
                <p>Quantity: {item.quantity}</p>
                <p>Price per item: ${item.price}</p>
                <p>Subtotal: ${ (item.price * item.quantity).toFixed(2)}</p>
                <hr/>
                </div>
                )}
                <button
                onClick={handleCheckOut}>
                Check out
                </button>
            </div>    
           
            )}
        </div>
       
    )
}