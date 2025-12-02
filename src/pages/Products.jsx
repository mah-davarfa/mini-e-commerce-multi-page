
import {getProductsByCategory,getProducts} from '../api/ProductsApi'
import { useEffect,useState,useMemo ,useRef} from 'react' 
import { useParams, Link,useSearchParams ,useNavigate} from 'react-router-dom';
export default function Products (){
    const [isLoading,setIsloading]= useState(true);
    const [products,setProducts]= useState([]);
    const [error , setError] = useState(null);
    const {category}=useParams()
    const [SearchParams]=useSearchParams();
    const searchTerm = (SearchParams.get('q') || '').toLowerCase();
    const navigate = useNavigate();

    
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

        const timerRef = useRef (null);
        useEffect(() => {
            // clear any existing timer first
            if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
            }

            if (!showNotFound) return; // nothing to do

            timerRef.current = setTimeout(() => {
            navigate("/", { replace: true });
            }, 2000);

            // cleanup on dependency change OR unmount
            return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = null;
            };
        }, [showNotFound, navigate]);

        if(isLoading)return <p className="ms">Products is Loading...</p>
        if(error) return <p className="ms">the page can not load because : {error}</p>

    return(
        <div className="products"> {showNotFound ? (
            (<p className="ms">The {searchTerm} that you are looking for is out of stock</p>)
        ):(
            <div className="products-flex">
             {filteredProduct.map((t)=>
            (
                <Link key={t.id} to={`/products/${t.id}`}>
                 <section >
                    <p>{t.category}</p>
                    <p>{t.title}</p>
                    <img src={t.image} alt={t.title}/>
                    <p>${t.price}</p>
                    <button>View Details</button>
                 </section>
                </Link> 
            )
            )}
            </div>
        )}
            
           
        </div>
    )
}