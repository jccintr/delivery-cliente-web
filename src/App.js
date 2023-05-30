import React, { useState,} from 'react';
import {BrowserRouter,Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import './App.css';
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Content from "./components/Content/Content";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import AddProduct from "./components/AddProduct/AddProduct";

function App() {
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
         <Header />
         <BrowserRouter>
            <Routes>
               <Route path="/" element={<Content/>} />
               <Route path="/cart" element={<Cart itensPedido={itensPedido} deleteItemPedido={deleteItemPedido}/>} />
               <Route path="/checkout" element={<Checkout/>} />
               <Route path="/product" element={<AddProduct itensPedido={itensPedido} addItemPedido={addItemPedido}/>} />
            </Routes>
            <Footer itensPedido={itensPedido}/>
         </BrowserRouter>
         
      </DataProvider>
        
    </div>
  );
}

export default App;

