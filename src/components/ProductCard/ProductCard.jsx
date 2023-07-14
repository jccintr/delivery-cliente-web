import React, {useContext} from 'react'
import styles from "./styles.module.css";
import Api from '../../Api';
import { useNavigate } from "react-router-dom";
import DataContext from '../../context/DataContext';

const ProductCard = ({produto}) => {
    const {tenant} = useContext(DataContext);
    const navigate = useNavigate();

    const onProductClick = () => {
        if (tenant.aberto) navigate("/product", { state: { produto } });
     }



    return (
        <div className={styles.container} onClick={onProductClick}>
              {produto.imagem&&<div className={styles.imageArea}>
                  <img className={styles.imagemProduto} alt="imagem do produto" src={`${Api.base_storage}/${produto.imagem}`} />
              </div>}
              <div className={styles.coluna}>
                  <p className={styles.produtoNome}>{produto.nome}</p>
                  <div className={styles.produtoIngredientes}>{produto.descricao}</div>
                  <div className={styles.linhaPreco}>
                      <div className={styles.preco}>R$ {produto.preco}</div>
                  </div>
              </div>
        </div>
      );
}

export default ProductCard