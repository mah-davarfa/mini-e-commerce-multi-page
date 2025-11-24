import { useState,useContext } from "react"
import { useNavigate } from "react-router-dom"
import {AppContext} from '../context/AppContext.jsx'

export default function CheckOut (){
    const {usersCart,setUsersCart,users,currentUser}= useContext(AppContext);
   const [isCheckOutClicked, setIsCheckOutClicked]= useState (false);
   const navigate = useNavigate();

   let items = [];
    const userId= users[currentUser]?.id;
    const userCarts = usersCart[userId] || {} ;
    items =  Object.entries(userCarts);

   const handleCheckOut =()=>{
    setIsCheckOutClicked (true);
    setTimeout(()=>{
        navigate('/');
        setIsCheckOutClicked(false);
        setUsersCart((preUsersCart)=>{
            const{[userId]:_removed , ...restOfUsers}= preUsersCart;
            return restOfUsers;
        })
    },2000)
   }


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
                <div>
                <p key={itemId}>{item.title}</p>
                <img src={item.image} alt={item.title} width="50px" />
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