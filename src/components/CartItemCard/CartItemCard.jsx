import React from 'react';
import styles from "./styles.module.css";
import { FaTrashAlt } from "react-icons/fa";
import Api from '../../Api';

const CartItemCard = ({itemPedido,deleteItemPedido}) => {
  console.log(itemPedido.produto.imagem);
  return (
    <div className={styles.container} key={itemPedido.id}>
            <div className={styles.leftArea}>
                {itemPedido.produto.imagem&&<img className={styles.imagemProduto} alt="imagem do produto" src={`${Api.base_storage}/${itemPedido.produto.imagem}`}/>}
                <p className={styles.quantidadeText}>{itemPedido.quantidade}</p> 
                <div className={styles.nomeProdutoArea}>
                    <p className={styles.produtoText}>{itemPedido.produto.nome}</p>
                    {itemPedido.observacao.length>0 && <div ><p className={styles.observacaoText}>{itemPedido.observacao}</p></div>}
                 </div>
            </div>
            <div className={styles.itemCarrinhoTotalDelete}>
                <p className={styles.totalItemText}>R$ {itemPedido.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                <p className={styles.deleteIcon}><FaTrashAlt onClick={()=> deleteItemPedido(itemPedido.id) }/></p> 
            </div>
   </div>
  )
}

export default CartItemCard