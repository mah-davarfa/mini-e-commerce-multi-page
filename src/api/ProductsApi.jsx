


const BASE_URL= 'https://fakestoreapi.com';

const fetchFakeStore= async(path)=>{

    try{
            const response = await fetch(`${BASE_URL}${path}`)
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
           
            return data;
        }catch(error){
            console.error('fetching error: ', error)
            throw error;
        }
    
}

    ///helper function for getting products 'https://fakestoreapi.com/products'-> give us all products
    export const getProducts =()=>{
        
        return fetchFakeStore('/products');
    }
    //heper to get all gategories `https://fakestoreapi.com/products/categories'-> give us all categories
    export const getCategories =()=>{
        return fetchFakeStore('/products/categories');
    }
    ///helper to get products by id `https://fakestoreapi.com/products/${id}`-> give us single product
    export const getProductById =(id)=>{
        return fetchFakeStore(`/products/${id}`);
    }
    ///helper to get each gategory https://fakestoreapi.com/products/category/{categoryName}`-> give us one of the category
    export const getProductsByCategory=(category)=>{
        const path = encodeURIComponent(category)
        return fetchFakeStore(`/products/category/${path}`)
    }
