import React from 'react'
import styles from "./styles.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';


const Footer = ({itensPedido}) => {
  const [totalPedido,setTotalPedido] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setTotalPedido(itensPedido.reduce( (n,{totalProduto}) => n + totalProduto,0));
  }, [itensPedido]);


  return (
    <footer className={styles.container}>
        <div className={styles.left} onClick={()=>navigate('/cart')}>
            <div className={styles.auxiliar}>
                <FaShoppingCart size={20} />
                <p className={styles.itensCarrinho}>{itensPedido.length > 0 ? itensPedido.length===1 ? '1 item' : itensPedido.length + ' itens' : 'Vazio'}</p>
            </div>
        </div>
        {itensPedido.length>0 && <div onClick={()=>{}}><p>Finalizar Pedido</p></div>}
        {itensPedido.length>0 && <div className={styles.right}><p>R$ {totalPedido.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p></div>}
    </footer>
  );



  return (
    <div className={styles.container}>
        Footer {itensPedido.length}
    </div>
  )
}

export default Footer