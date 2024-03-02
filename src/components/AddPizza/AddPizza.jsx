import React, { useState, useEffect,useContext} from 'react';
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Api from '../../Api';
import SelectFieldGenerico from '../SelectFieldGenerico/SelectFieldGenerico';
import AdicionalCard from '../AdicionalCard/AdicionalCard';
import DataContext from '../../context/DataContext';
import MessageBox from '../MessageBox/MessageBox';


const AddPizza = ({itensPedido,addItemPedido}) => {
    const {slug} = useContext(DataContext);
    const navigate = useNavigate();
    const params = useLocation();
    const {produto} = params.state;
    const [quantidade, setQuantidade] = useState(1);
    const valorUnitario = 10.00 //produto.preco;
    const [totalAdicional,setTotalAdicional] = useState(0);
    const [total, setTotal] = useState(0);
    const [observacao,setObservacao] = useState('');
    const [selectFields,setSelectFields] = useState([]);
    const [adicionais,setAdicionais] = useState([]);
    const [dialogMessage,setDialogMessage] = useState('');
    const [dialogVisible,setDialogVisible] = useState(false);
    const [titleMessageBox,setTitleMessageBox] = useState('');
    const [tamanho,setTamanho] = useState(1);

    const adicionarClick = () => { 
    }

    const IncreaseQuantity = () => {
        setQuantidade(quantidade + 1);
      };
    
      const DecreaseQuantity = () => {
        if (quantidade > 1) {
          setQuantidade(quantidade - 1);
        }
      };
      const CalculaTotal = () => {
        let total = quantidade * (parseFloat(valorUnitario) + parseFloat(totalAdicional));
        setTotal(total);
      };


  return (
    <main className={styles.container}>
        <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
        <div className={styles.body}>
          <div className={styles.titleContainer}>
              <div className={styles.title}>Pizzas</div>
          </div>
          <div className={styles.deliveryArea}>
              <div className={styles.subTitle}>Escolha o tamanho:</div>
          </div>
          <div className={styles.deliveryArea} >
                    <button className={tamanho===1?styles.botaoEntregarSelected:styles.botaoEntregar} onClick={()=>{}}>Grande</button>
                    <button className={tamanho===2?styles.botaoRetirar:styles.botaoRetirarSelected} onClick={()=>{}}>Broto</button>
          </div>
          
          
          
          <div className={styles.containerObservacao}>
            <p className={styles.observacaoLabel}>Observações:</p>
            <textarea className={styles.inputObservacao} onChange={(e)=> setObservacao(e.target.value)}></textarea>
          </div>
          
          
          
          
          <div className={styles.containerQuantidade}>
            <div className={styles.divInputQuantidade}>
              <button className={styles.botaoQuantidade} onClick={DecreaseQuantity}>-</button>
              <input disabled className={styles.inputQuantidade} type="text" value={quantidade} />
              <button className={styles.botaoQuantidade} onClick={IncreaseQuantity}>+</button>
            </div>
            <div className={styles.containerBotaoAdicionar}>
              <button className={styles.botaoAdicionar} onClick={()=>{adicionarClick()}}>
                Adicionar R${" "}
                {total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </button>
            </div>
          </div>
        </div>
        {dialogVisible&&<MessageBox title={titleMessageBox} mensagem={dialogMessage} setDialogVisible={setDialogVisible}/>}
    </main>
  )
}

export default AddPizza