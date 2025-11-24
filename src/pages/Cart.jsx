import {useNavigate} from 'react-router-dom'
import {useState,useContext}from 'react'
import {AppContext} from '../context/AppContext.jsx'


//modify Quantity delete /total number of carts/total price of each cart,
export default function Cart (){
    const {usersCart,setUsersCart,setCart,cart,users,currentUser,isLoggedin}= useContext(AppContext);
    const [isEditingItemId,setIsEditingItemId]= useState (null);
    const[newQuantity,setNewQuantity]= useState (1);
    const[isCartEmpty,setIsCartEmpty]= useState(false);
    const navigate = useNavigate();
    
    const handleCheckout =()=>{
    navigate('/checkout')
    }
    const userCartItems = ()=>{
     const userId= users[currentUser]?.id;
     const userCarts = usersCart[userId] || {} ;
     return  Object.entries(userCarts)
    }
    const startEdit =(itemId,currentQuantity)=>{
        setIsEditingItemId(itemId);
        setNewQuantity(currentQuantity);
    }
    const handleEdit =(itemId,newQuantity)=>{
        const userId= users[currentUser]?.id;
        if(isLoggedin ){
                    setUsersCart((preUsersCart)=>{
            return{
                ...preUsersCart,//All users
                        [userId]:{
                    ...preUsersCart[userId],//All Carts for this user
                                    [itemId]:{
                         ...preUsersCart[userId][itemId],
                            quantity: newQuantity
                    }
                }
            }
        })
            setNewQuantity(1);
            setIsEditingItemId(null);
        }else{
            setCart((preCart)=>{
                return preCart.map(c=>(c.id===itemId ?{...c, quantity:newQuantity} : c))
               
            })
            setNewQuantity(1);
            setIsEditingItemId(null);
        }
    }
    const handleDelete = (itemId)=>{
        const userId= users[currentUser]?.id;
        
        if(isLoggedin && userId){
            setUsersCart((preUsersCart)=>{
                const items = preUsersCart[userId];// all carts for this user
                const {[itemId]: _remove, ...restItems} = items;//remove the item from user carts
                  if (Object.keys(restItems).length === 0) {
                        const { [userId]: _gone, ...restUsers } = preUsersCart;
                        return restUsers;
                    }
                return {
                         ...preUsersCart,
                            [userId]: restItems
                        };

            })
        }else{
            
            setCart((preCart)=>{
                return [ ...preCart.filter(c=>c.id !== itemId)]
                 
            })
            }
    }
 
       
return(                       
        <div>
            <h2>Cart</h2>
            <div>
                {isLoggedin?( 
                   userCartItems().map(([itemId,item])=>(
                    <div key={itemId}>
                        <img src={item.image} alt={item.title} width="50"/>
                        <span>{item.title}</span>
                        <span>Price: {item.price}</span>
                       {
                        isEditingItemId !== itemId ?(
                            <div>
                                <span>Quantity: {item.quantity}</span>
                                <button onClick={()=>startEdit(itemId,item.quantity)}>Edit</button>
                            </div>
                        ):(
                                <form onSubmit={(e)=>{
                                    e.preventDefault();
                                    handleEdit(itemId,newQuantity)
                                }}>
                                <label htmlFor="">Quantity</label>
                                <input
                                type="number"
                                step='1'
                                min="1"
                                value={newQuantity}
                                    onChange={(e)=>setNewQuantity(Number(e.target.value))}>
                                </input>
                                <button type='submit'>Save</button>
                                </form>
                            )
                        } 
                        <span>Total: {Number(item.price) * item.quantity}</span>
                        <button onClick={()=>{handleDelete(itemId)}}>Delete</button>
                    </div>
                   ))
                ):(
                     cart.map(item=>(
                    <div key={item.id}>
                        <img src={item.image} alt={item.title} width="50"/>
                        <span>{item.title}</span>
                        <span>Price: {item.price}</span>
                        {
                            isEditingItemId !==item.id ? (
                                <div>
                                    <span >Quantity: {item.quantity}</span>
                                    <button onClick={()=>startEdit(item.id,item.quantity)}>Edit</button>
                                </div>
                            ):(
                                <form onSubmit={(e)=>{
                                    e.preventDefault();
                                    handleEdit (item.id,newQuantity)
                                }}>
                                    <label htmlFor="">Quantity</label>
                                    <input 
                                    type='number'
                                    step='1'
                                    min='1'
                                    value={newQuantity}
                                    onChange={(e)=>setNewQuantity(Number(e.target.value))}
                                    ></input>
                                    <button type='submit'>Save</button>
                                </form>
                            )
                        }
                        <span>Total: {Number(item.price) * item.quantity}</span>
                        <button onClick={()=>{handleDelete(item.id)}}>Delete</button>
                    </div>
                  ))
                )}
            </div>
                <div>{
                    (isLoggedin && userCartItems().length ===0) || (!isLoggedin && cart.length===0) ?(
                       <>
                        <p>Your cart is empty</p>
                        <button onClick ={()=>navigate('/')}>Go to shop</button>
                       </>
                        
                    ):(
                        <button onClick ={handleCheckout}>check out</button>
                    ) 
                    }
                </div>
                
        </div>
    ) 
}
     
//usersCart = {
      //   userId1: { itemId1: {...}, itemId2: {...} }, object.entries-> [[itemId1,{...}],[itemId2,{...}]]
     //   userId2: { ... },
     // }
     ///////////////////////////Object.entries(userCarts) -> [[itemId, {item}], [itemId, {item}]]
     //cart = [{item:id,quatity: number,price:number,titl:name,image},..]
     ////////////////
     //newCart ={
            //     id:product.id,
            //     title:product.title,
            //     price:product.price,
            //     image:product.image,
            //     quantity
            // }