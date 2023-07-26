import React, {useContext} from 'react';
import styles from "./styles.module.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DataContext from '../../context/DataContext';

const EmptyCart = () => {
    const navigate = useNavigate();
    const {slug} = useContext(DataContext);

  return (
    <div className={styles.container}>
        <FaShoppingCart size={60}/>
        <p>Seu Carrinho está vazio.</p><button className={styles.botao}  onClick={()=>{navigate(`/${slug}`);}}>Adicionar Itens</button>
    </div>
  )
}

export default EmptyCart