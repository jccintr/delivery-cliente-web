import React, {useContext,useState} from 'react'
import styles from "./styles.module.css";
import Api from '../../Api';
import ModalClosed from '../ModalClosed/ModalClosed';
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const PizzaCard = ({pizza,sabor}) => {
  const {setPizzaSabor1,setPizzaSabor2} = useContext(DataContext);
  const [dialogMessage,setDialogMessage] = useState('');
  const [dialogVisible,setDialogVisible] = useState(false);
  const navigate = useNavigate();
  
  const onProductClick = (pizza) => {
    
    if(sabor===1){
      setPizzaSabor1(pizza);
    } else {
      setPizzaSabor2(pizza);
    }
    
    navigate("/pizza");
  }

  return (
    <div className={styles.container} onClick={()=>onProductClick(pizza)}>
          {pizza.imagem&&<div className={styles.imageArea}>
              <img className={styles.imagemProduto} alt="imagem do produto" src={`${Api.base_storage}/${pizza.imagem}`} />
          </div>}
          <div className={styles.coluna}>
              <p className={styles.produtoNome}>{pizza.nome}</p>
              <div className={styles.produtoIngredientes}>{pizza.descricao}</div>
              <div className={styles.linhaPreco}>
                  <div className={styles.preco}>Grande R$ {pizza.grande.toFixed(2)}</div>
                  <div className={styles.preco}>Broto R$ {pizza.broto.toFixed(2)}</div>
              </div>
          </div>
          {dialogVisible&&<ModalClosed mensagem={dialogMessage} setDialogVisible={setDialogVisible}/>}
    </div>
  );
}

export default PizzaCard