import {BrowserRouter,Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

function App() {
  return (
    <div className="App">
      <DataProvider>
         <Header />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Content/>} />
               <Route path="/cart" element={<Cart/>} />
               <Route path="/checkout" element={<Checkout/>} />
            </Routes>
         </BrowserRouter>
         <Footer/>
      </DataProvider>
        
    </div>
  );
}

export default App;

