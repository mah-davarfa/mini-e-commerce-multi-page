
import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import ProtectedRoute from "./util/ProtectedRoute";
import ShowCase from "./pages/ShowCase";
import Login from "./pages/Login";
import CheckOut from "./pages/CheckOut";
import AppProvider from "./context/AppContext";
import { NotFound } from "./pages/NotFound";

function App() {
  


  return (
    <AppProvider>
    <div className='skeleton'>
      <h1>WelCome to Mini E-Commerce App</h1>

      <NavBar />
      <Routes>
        <Route path="/" element={<ShowCase />}>
          <Route index element={<Products />} />
          <Route path="category/:category" element={<Products/>}/>
          <Route path="products/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<Login />} />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer />
    </div>

    </AppProvider>
    
  );
}

export default App;
