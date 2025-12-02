import { Outlet ,Link,NavLink} from "react-router-dom"
import {getCategories} from '../api/ProductsApi'
import {useEffect,useState} from 'react'


export default function ShowCase (){
  const [category,setCategory]=useState([]);
  const [error,setError]= useState();
  const [isloading,setIsloading]= useState(true);

      useEffect(()=>{
        let cancelled=false;
        
        const getCategory = async()=>{
          try{
            const data = await getCategories();
            if(!cancelled) setCategory(data)
          }catch(error){
            if(!cancelled) setError(error.message || 'failed to load Category')
          }finally{
            if(!cancelled)setIsloading(false);
          }
        }
         getCategory();

          return()=>{
            cancelled=true;
          }
      },[])
    
  if (isloading) return <p className="ms">Menu is loading...</p>
  if(error) return <p className="ms">there is erro for loading menu: {error}</p>
  return(

    <div className='showcase'>
      
      <div>
        {category.map((t)=>
        (
          <NavLink key={t} to={`/category/${t}`} className={({isActive})=> isActive ? 'active' : undefined}>
            {t}
          </NavLink>
        )
      )}
      </div>
      <div className="showcaseOutlet">
       <Outlet />
      </div>
    </div>
    )
}