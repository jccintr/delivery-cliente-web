import React from 'react';
import styles from "./styles.module.css";

const ItemPedidoCard = ({item,last}) => {
 
    return (
        <div className={styles.container} >
            <div className={styles.itemContainer}>
               <span>{item.quantidade}  {item.produto.nome}</span> 
               <span style={{fontWeight:'bold'}}>R$ {item.total}</span> 
            </div>
            {item.obrigatorios.map((item,index)=><span className={styles.detalhesText} key={index}>{item}</span>)}
            {item.adicionais.map((item,index)=><span className={styles.detalhesText} key={index}>   + {item}</span>)}
            {item.observacao!=null?<span className={styles.detalhesText}>Obs: {item.observacao}</span>:''}
        </div>
      )



}

export default ItemPedidoCard