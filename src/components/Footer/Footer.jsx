import React from 'react';
import styles from "./styles.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {useState,useEffect, useContext} from 'react';
import DataContext from '../../context/DataContext';


const Footer = ({itensPedido}) => {
  const [totalPedido,setTotalPedido] = useState(0);
  const navigate = useNavigate();
  const {corFundo,corTexto,loadingPage} = useContext(DataContext);

  useEffect(() => {
    setTotalPedido(itensPedido.reduce( (n,{total}) => n + total,0));
  }, [itensPedido]);


  return (
    <>
    {!loadingPage&&<footer className={styles.container} style={{backgroundColor: corFundo}}>
        <div className={styles.left} onClick={()=>navigate('/cart')}>
            <div className={styles.auxiliar}>
                <FaShoppingCart size={20} color={corTexto}/>
                <p className={styles.itensCarrinho} style={{color: corTexto}}>{itensPedido.length > 0 ? itensPedido.length===1 ? '1 item' : itensPedido.length + ' itens' : 'Vazio'}</p>
            </div>
        </div>
        {itensPedido.length>0 && <div onClick={()=>navigate('/checkout')}><p style={{color: corTexto}}>Finalizar Pedido</p></div>}
        {itensPedido.length>0 && <div className={styles.right}><p style={{color: corTexto}}>R$ {totalPedido.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p></div>}
    </footer>}
    </>
  );



  return (
    <div className={styles.container}>
        Footer {itensPedido.length}
    </div>
  )
}

export default Footer