import { Outlet ,Link} from "react-router-dom"
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
    
  if (isloading) return <p>Menu is loading...</p>
  if(error) return <p>there is erro for loading menu: {error}</p>
  return(

    <div className='showcase'>
      <h2>Welcome to the Showcase</h2>
      <div>
        {category.map((t)=>
        (
           <Link key={t} to= {`category/${encodeURIComponent(t)}`} >{t}</Link>
        )
      )}
      </div>
      <div>
       <Outlet />
      </div>
    </div>
    )
}