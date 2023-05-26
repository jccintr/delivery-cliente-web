import React from 'react'
import styles from "./styles.module.css";
import Api from '../../Api';

const ProductCard = ({produto}) => {
    return (
        <div className={styles.container}>
              <div className={styles.imageArea}>
                  <img className={styles.imagemProduto} alt="imagem do produto" src={`${Api.base_storage}/${produto.imagem}`} />
              </div>
              <div className={styles.coluna}>
                  <div className={styles.produtoNome}>{produto.nome}</div>
                  <div className={styles.produtoIngredientes}>{produto.descricao}</div>
                  <div className={styles.linhaPreco}>
                      <div className={styles.preco}>R$ {produto.preco}</div>
                  </div>
              </div>
        </div>
      );
}

export default ProductCard