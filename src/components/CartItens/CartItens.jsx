import React from 'react';
import styles from "./styles.module.css";
import CartItemCard from '../CartItemCard/CartItemCard';

const CartItens = ({itensPedido,deleteItemPedido}) => {

  
  return (
    <div className={styles.container}>
      {itensPedido.map((itemPedido) =><CartItemCard key={itemPedido.id} itemPedido={itemPedido} deleteItemPedido={deleteItemPedido}/>)}
      
    </div>
  )
}

export default CartItens