
import {getProductsByCategory,getProducts} from '../api/ProductsApi'
import { useEffect,useState,useMemo } from 'react' 
import { useParams, Link,useSearchParams ,useNavigate} from 'react-router-dom';
export default function Products (){
    const [isLoading,setIsloading]= useState(true);
    const [products,setProducts]= useState([]);
    const [error , setError] = useState(null);
    const {category}=useParams()
    const [SearchParams]=useSearchParams();
    const searchTerm = (SearchParams.get('q') || '').toLowerCase();
    

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

        const filteredProduct= useMemo(()=>{
            if(!searchTerm) return products;
             const result =products.filter((p)=>
            (p.title.toLowerCase().includes(searchTerm.toLowerCase())))
             if (result.length<= 0) return products;
             return result;
        },[products, searchTerm])

        const showNotFound= searchTerm && products.filter(
            (p)=>p.title.toLowerCase().includes(searchTerm.toLowerCase())
        ).length===0;

        if(isLoading)return <p>Products is Loading...</p>
        if(error) return <p>the page can not load because : {error}</p>

    return(
        <div> {showNotFound &&
            (<p>The {searchTerm} that you are looking for is out of stuck</p>)}
            <h2>The Products from: https://fakestoreapi.com:</h2>
            {filteredProduct.map((t)=>
            (
                <Link key={t.id} to={`/products/${t.id}`}>
                 <section >
                    <p>{t.category}</p>
                    <p>{t.title}</p>
                    <img src={t.image} alt="picture"/>
                    <p>${t.price}</p>
                    <button
                    
                    >
                        add to cart
                    </button>
                   </section>
                </Link> 
            )
            )}
        </div>
    )
}