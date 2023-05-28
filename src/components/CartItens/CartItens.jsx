import React from 'react';
import styles from "./styles.module.css";
import { FaTrashAlt } from "react-icons/fa";

const CartItens = ({itensPedido}) => {
  return (
    <div>
      {itensPedido.map((itemPedido) =><p>{itemPedido.produto.nome}</p>)}
    </div>
  )
}

export default CartItens