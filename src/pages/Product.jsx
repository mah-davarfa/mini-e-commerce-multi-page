import { useParams } from "react-router-dom"
import {useEffect,useState} from 'react'
import {getProductById} from '../api/ProductsApi'
export default function Product(){
    const {id}= useParams();

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
             
                <section key={product.id}>
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                    <p>{product.category}</p>
                    <p>
                        rate: {product.rating?.rate}, count: {product.rating?.count}
                    </p>
                    <img src={product.image} alt="picture"/>
                </section>
                
             
        </div>
           
    )
}