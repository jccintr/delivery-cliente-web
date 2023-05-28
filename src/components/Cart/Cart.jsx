import React from 'react'
import styles from "./styles.module.css";
import { FaChevronLeft } from "react-icons/fa";
//import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import CartItens from '../CartItens/CartItens';

const Cart = ({itensPedido}) => {
    const navigate = useNavigate();

    return (
        <main className={styles.container}>
            <div className={styles.body}>
                <div className={styles.areaTitulo}>
                    <FaChevronLeft size={30}  onClick={()=>navigate('/')}/>
                    <div className={styles.titulo}>Meu Carrinho {itensPedido.length}</div>
                </div>
                <CartItens itensPedido={itensPedido}/>
            </div>
       </main>
      );


}

export default Cart