import React, {useContext,useState} from 'react'
import styles from "./styles.module.css";
import Api from '../../Api';
import { useNavigate } from "react-router-dom";
import DataContext from '../../context/DataContext';
//import ModalDialog from '../ModalDialog/ModalDialog';
import ModalClosed from '../ModalClosed/ModalClosed';

const ProductCard = ({produto,last}) => {
    const {tenant,setProdutoPizza,setPizzaSabor1,setPizzaSabor2,setTamanhoPizza,setSaboresPizza} = useContext(DataContext);
    const navigate = useNavigate();
    const [dialogMessage,setDialogMessage] = useState('');
    const [dialogVisible,setDialogVisible] = useState(false);

    const onProductClick = () => {
        if (tenant.aberto){
            if(produto.pizza){
                setProdutoPizza(produto);
                setPizzaSabor1(null);
                setPizzaSabor2(null);
                setTamanhoPizza(1);
                setSaboresPizza(1)

                navigate("/pizza");
            } else {
                navigate("/product", { state: { produto } });
            }
            
        } else {
            showModalDialog('Lamentamos, mas nossa loja está fechada no momento e não pode receber pedidos.')
        } 
     }

     const showModalDialog = (mensagem) => {
        setDialogMessage(mensagem);
        setDialogVisible(true);
    }

    return (
        <div className={!last?styles.container:styles.container_last} onClick={onProductClick}>
              {produto.imagem&&<div className={styles.imageArea}>
                  <img className={styles.imagemProduto} alt="imagem do produto" src={`${Api.base_storage}/${produto.imagem}`} />
              </div>}
              <div className={styles.coluna}>
                  <p className={styles.produtoNome}>{produto.nome}</p>
                  <div className={styles.produtoIngredientes}>{produto.descricao}</div>
                  <div className={styles.linhaPreco}>
                      {!produto.pizza&&<div className={styles.preco}>R$ {produto.preco}</div>}
                  </div>
              </div>
              {dialogVisible&&<ModalClosed mensagem={dialogMessage} setDialogVisible={setDialogVisible}/>}
        </div>
      );
}

export default ProductCard