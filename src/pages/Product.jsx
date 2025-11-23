import { useParams } from "react-router-dom"
import {useEffect,useState,useContext} from 'react'
import {getProductById} from '../api/ProductsApi'
import { AppContext } from "../context/AppContext";
export default function Product(){
    const {handleAddCart} = useContext(AppContext);
    const {id}= useParams();
    const [quantity, setQuantity]= useState(1);
    const [isLoading,setIsloading]=useState(false)
    const [error, setError]= useState('')
    const [ product,setProduct] = useState({});
   

    useEffect(()=>{
        let cancelled = false;
        const getProduct=async(id)=>{
            setIsloading(true)

            try{
                const data = await getProductById(id);
                if(!cancelled) setProduct(data); console.log('data in product page:',data)
            }catch(error){
                if(!cancelled) setError(error.message|| 'loading product failed')
            }finally{
                if(!cancelled) setIsloading(false)
            }
           }

         getProduct(id)
        return()=>{
            cancelled=true; 
        }
    },[id])
    console.log('product in poduct page:',product);
    if(isLoading)return <p>loading product ...</p>
    if(error) return <p>there is Error to load product : {error}</p>
    return(
        <div>
             <h3>Product Details</h3>
                 <form 
                    onSubmit={(e)=>{
                        e.preventDefault();
                        handleAddCart(product,quantity)
                     }}
                    >
                  <section key={product.id}>
                    <p>{product.title}</p>
                    <img src={product.image} alt="picture"/>
                    <p>{product.description}</p>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                    <p>
                        rate: {product.rating?.rate}, count: {product.rating?.count}
                    </p>
                       <button
                        type='submit'>
                            add to cart
                        </button>
                        <label>
                            Quantity :
                        </label>
                        <input
                        onChange={(e)=>setQuantity(Number(e.target.value))}
                        type="number" 
                        step="1" 
                        min="1" 
                        value={quantity} 
                       
                        ></input>
                    </section>
                 </form>
        </div>
    )
}