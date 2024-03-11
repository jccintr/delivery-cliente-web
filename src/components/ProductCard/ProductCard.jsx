import React, {useContext,useState} from 'react'
import styles from "./styles.module.css";
import Api from '../../Api';
import { useNavigate } from "react-router-dom";
import DataContext from '../../context/DataContext';
//import ModalDialog from '../ModalDialog/ModalDialog';
import ModalClosed from '../ModalClosed/ModalClosed';

const ProductCard = ({produto}) => {
    const {tenant} = useContext(DataContext);
    const navigate = useNavigate();
    const [dialogMessage,setDialogMessage] = useState('');
    const [dialogVisible,setDialogVisible] = useState(false);

    const onProductClick = () => {
        if (tenant.aberto){
            navigate("/pizza", { state: { produto } });
        } else {
            showModalDialog('Lamentamos, mas nossa loja está fechada no momento e não pode receber pedidos.')
        } 
     }

     const showModalDialog = (mensagem) => {
        setDialogMessage(mensagem);
        setDialogVisible(true);
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
              {dialogVisible&&<ModalClosed mensagem={dialogMessage} setDialogVisible={setDialogVisible}/>}
        </div>
      );
}

export default ProductCard