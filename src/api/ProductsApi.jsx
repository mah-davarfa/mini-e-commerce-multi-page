

const URL_FAKESTORE = 'https://fakestoreapi.com/products'
export const getProductsInLoadingPage = async ()=>{
    try{
            const response = await fetch(URL_FAKESTORE)
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            return data;
    }catch(error){
        console.error('fetching error: ', error)
        throw error;
    }
    
}
