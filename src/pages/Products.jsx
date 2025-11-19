
import {getProductsByCategory,getProducts} from '../api/ProductsApi'
import { useEffect,useState } from 'react' 
import { useParams, Link } from 'react-router-dom';
export default function Products (){
    const [isLoading,setIsloading]= useState(true);
    const [products,setProducts]= useState([]);
    const [error , setError] = useState(null);
        const {category}=useParams()
    
    useEffect(()=>{

            let cancelled = false;
            const loadProducts = async()=>{
                setIsloading(true)
                try{
                   const data = category ? 
                   await getProductsByCategory(category)
                    : 
                    await getProducts();
                    if(!cancelled)  setProducts(data);
                }catch (err){
                    if(!cancelled) setError(err.message || "Failed to load products");
                }finally{
                    if(!cancelled)setIsloading(false);
                }
               };
               loadProducts();

               return()=>{
                cancelled = true;
               }
        },[category])

        if(isLoading)return <p>Products is Loading...</p>
        if(error) return <p>the page can not load because : {error}</p>

    return(
        <div>
            <h2>The Products from: https://fakestoreapi.com:</h2>
            {products.map((t)=>
            (
                <Link key={t.id} to={`/products/${t.id}`}>
                 <section >
                    <p>{t.title}</p>
                    <p>${t.price}</p>
                    <p>{t.description}</p>
                    <p>{t.category}</p>
                    <img src={t.image} alt="picture"/>
                   </section>
                </Link> 
            )
            )}
        </div>
    )
}