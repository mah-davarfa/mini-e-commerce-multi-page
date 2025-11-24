import {useMemo, createContext, useState, useEffect } from 'react'

export const AppContext = createContext(); 

export default function AppProvider  ({children}){
    
    const [isLoggedin,setIsLoggedin]=useState(false)
    const [wrongPassword,setWrongPassword]= useState(false);
    const [users,setUsers]=useState({});  //users={user:{password:password,id:id},...}
    const [currentUser,setCurrentUser]=useState('')
    const [cart ,setCart]=useState([]); //[{item:id,quatity: number,price:number,titl:name,image},..]
    const [usersCart,setUsersCart]= useState({});   //usersCart = {
                                                                //   userId1: { itemId1: {...}, itemId2: {...} },
                                                                //   userId2: { ... },
                                                                // }
     
   //add,dellet , change quantity  addCart function used in product
        const handleAddCart = (product,quantity)=>{
                const newCart ={
                id:product.id,
                title:product.title,
                price:product.price,
                image:product.image,
                quantity
            }
            if(isLoggedin){// use an other function to add to userCart
                addToUsersCart(newCart)
            }else{ addToGuestCart(newCart);}
            
        } 

        const addToGuestCart =(item)=>{
            setCart(preCart=>{
                const existCart = preCart.find(c=>c.id ===item.id)
                if(existCart){
                    return preCart.map(c=>(c.id===item.id ? {...c ,quantity:(c.quantity + item.quantity)} : c))
                }else{
                    return [...preCart , item];
                }
            })
            }

        const addToUsersCart =(item)=>{
            setUsersCart((preUsersCart)=>{
            const userId= users[currentUser].id;
            const itemId= item.id;
            //1-user alreday has cart->if item exist update quantity
            if(preUsersCart[userId]){
                if(preUsersCart[userId][itemId]){
                    return {
                        ...preUsersCart,
                        [userId]:{  ...preUsersCart[userId],
                            [itemId]:{...preUsersCart[userId][itemId],
                                quantity: preUsersCart[userId][itemId].quantity + item.quantity
                            }
                    }}
                    // if user exist has some item but this item not exist  add item
                   }else{
                       return {
                        ...preUsersCart,
                            [userId]:{...(preUsersCart[userId] || {}) , [itemId]:item}
                        
                     }
                }
            }else{//2-user does not have any cart -> creating first cart with this item
                return {
                    ...preUsersCart,
                        [userId]:{[itemId]:item}
                }
            }
            })}
            //merging 2 catrs when user log in,1-if user has existing cart -> if user exsit has any item
            useEffect(()=>{
                if(!isLoggedin) return;
                if(currentUser && cart.length>0){
                    cart.forEach(item=>addToUsersCart(item))
                }
                setCart([]);
            },[isLoggedin, currentUser, users, cart.length])
            
            ///counts for carts to show on navbar
            const countsOfItems = useMemo(()=>{
                if(!isLoggedin) return cart.length;
                const userId= users[currentUser]?.id;
                if(userId ){
                    return Object.keys(usersCart[userId]||{}).length;
                }else {return 0;}
            
            },[isLoggedin, cart, usersCart, currentUser, users])


    return(
        <AppContext.Provider value={{
            wrongPassword,
            isLoggedin,
            currentUser,
            setIsLoggedin,
            setWrongPassword,
            users,
            setCurrentUser,
            setUsers,
            handleAddCart,
            cart,
            usersCart,
            setUsersCart,
            setCart,
            countsOfItems
        }}>
            {children}
        </AppContext.Provider>    
    )
} 