
import {getProductsInLoadingPage} from '../api/ProductsApi'
import { useEffect,useState } from 'react' 
export default function Products (){
    const [isLoading,setIsloading]= useState(true);
    const [products,setProducts]= useState();
    const [error , setError] = useState(null);
        useEffect(()=>{

            let cancelled = false;
            const getProducts = async()=>{
                try{
                    const data = await getProductsInLoadingPage();
                    if(!cancelled)  setProducts(data);
                }catch (err){
                    if(!cancelled) setError(err.message || "Failed to load products");
                }finally{
                    if(!cancelled)setIsloading(false);
                }
               };
               getProducts();

               return()=>{
                cancelled = true;
               }
        },[])
        if(isLoading)return <p>Products is Loading...</p>
        if(error) return <p>the page can not load because : {error}</p>

    return(
        <div>
            <h2>the Products from: https://fakestoreapi.com are:</h2>
            {products.map((t)=>
            (
                <section key={t.id}>
                    <p>{t.title}</p>
                    <p>${t.price}</p>
                    <p>{t.discription}</p>
                    <p>{t.category}</p>
                    <img src={t.image} alt="picture"/>
                </section>
            )
            )}
        </div>
    )
}