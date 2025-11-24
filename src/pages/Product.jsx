import { useParams,useNavigate } from "react-router-dom"
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
    const [addProduct,setAddProduct]= useState(false);
    const navigate = useNavigate();
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

    const handleAdd =(product,quantity)=>{
        handleAddCart(product,quantity);
        setAddProduct(true);
        setTimeout(()=>{
            setAddProduct(false);
            navigate('/');
            
        },1500)
    }

    if(isLoading)return <p>loading product ...</p>
    if(error) return <p>there is Error to load product : {error}</p>
    return(
        <div>
             <h3>Product Details</h3>
                 <form 
                    onSubmit={(e)=>{
                        e.preventDefault();
                        handleAdd(product,quantity)
                     }}
                    >
                  <section key={product.id}>
                    <p>{product.title}</p>
                    <img src={product.image} alt={product.title}/>
                    <p>{product.description}</p>
                    <p>{product.category}</p>
                    <p>${product.price}</p>
                    <p>
                        rate: {product.rating?.rate}, count: {product.rating?.count}
                    </p>
                    {addProduct && <p>product added to cart</p>}
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