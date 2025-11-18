
export default function Products (){
    fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => console.log(data));
    return(
        <h2>Products</h2>
    )
}