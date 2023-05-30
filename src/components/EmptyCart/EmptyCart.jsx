import React from 'react';
import styles from "./styles.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
    const navigate = useNavigate();

  return (
    <div className={styles.container}>
        <FaShoppingCart size={60}/>
        <p>Seu Carrinho está vazio.</p><button className={styles.botao}  onClick={()=>{navigate('/');}}>Adicionar Itens</button>
    </div>
  )
}

export default EmptyCart