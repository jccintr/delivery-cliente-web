import React, {useState} from 'react';
import {BrowserRouter,Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import AddProduct from "./components/AddProduct/AddProduct";
import AddPizza from './components/AddPizza/AddPizza';
import OrderSent from './components/OrderSent/OrderSent';
import OrderError from './components/OrderError/OrderError';
import LastOrder from './components/LastOrder/LastOrder';
import Horarios from './components/Horarios/Horarios';


const App = () => {
   
   const [itensPedido, setItensPedido] = useState([]);
 
  

  const addItemPedido = (novoItemPedido) => {
    const novosItens = [...itensPedido, novoItemPedido];
    setItensPedido(novosItens);
   }

   const deleteItemPedido = (id) => {
    const newItensPedido = itensPedido.filter((item)=> item.id !== id);
    setItensPedido(newItensPedido);
   
 }


  return (
    <div className="App">
      <DataProvider>
          
         <BrowserRouter>
            <Header/>
            <Routes>
               <Route path="/:slug" element={<Content/>} />
               <Route path="/cart" element={<Cart itensPedido={itensPedido} deleteItemPedido={deleteItemPedido}/>} />
               <Route path="/checkout" element={<Checkout itensPedido={itensPedido} setItensPedido={setItensPedido}/>} />
               <Route path="/product" element={<AddProduct itensPedido={itensPedido} addItemPedido={addItemPedido}/>} />
               <Route path="/pizza" element={<AddPizza itensPedido={itensPedido} addItemPedido={addItemPedido}/>} />
               <Route path="/ordersent" element={<OrderSent/>}/>
               <Route path="/ordererror" element={<OrderError/>}/>
               <Route path="/status" element={<LastOrder/>}/>
               <Route path="/horarios" element={<Horarios/>}/>
            </Routes>
            <Footer itensPedido={itensPedido}/>
         </BrowserRouter>
        </DataProvider>
        
    </div>
  );
}

export default App;

