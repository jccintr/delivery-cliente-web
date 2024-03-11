import React, {useContext,useState} from 'react'
import styles from "./styles.module.css";
import Api from '../../Api';
import ModalClosed from '../ModalClosed/ModalClosed';
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const PizzaCard = ({produto,sabor}) => {
  const {setPizzaSabor1,setPizzaSabor2} = useContext(DataContext);
  const [dialogMessage,setDialogMessage] = useState('');
  const [dialogVisible,setDialogVisible] = useState(false);
  const navigate = useNavigate();
  

  const onProductClick = (produto) => {
    
    if(sabor===1){
      setPizzaSabor1(produto);
    } else {
      setPizzaSabor2(produto);
    }
    
    navigate("/pizza");
  }

  return (
    <div className={styles.container} onClick={()=>onProductClick(produto)}>
          {produto.imagem&&<div className={styles.imageArea}>
              <img className={styles.imagemProduto} alt="imagem do produto" src={`${Api.base_storage}/${produto.imagem}`} />
          </div>}
          <div className={styles.coluna}>
              <p className={styles.produtoNome}>{produto.nome}</p>
              <div className={styles.produtoIngredientes}>{produto.descricao}</div>
              <div className={styles.linhaPreco}>
                  <div className={styles.preco}>Grande R$ {produto.grande.toFixed(2)}</div>
                  <div className={styles.preco}>Broto R$ {produto.broto.toFixed(2)}</div>
              </div>
          </div>
          {dialogVisible&&<ModalClosed mensagem={dialogMessage} setDialogVisible={setDialogVisible}/>}
    </div>
  );
}

export default PizzaCard