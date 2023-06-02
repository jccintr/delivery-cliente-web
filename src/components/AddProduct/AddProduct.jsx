import React, { useState, useEffect} from 'react';
import styles from "./styles.module.css";
//import { FaChevronLeft } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Api from '../../Api';



const AddProduct = ({itensPedido,addItemPedido}) => {
  const navigate = useNavigate();
  const params = useLocation();
  const {produto} = params.state;
  const [quantidade, setQuantidade] = useState(1);
  const valorUnitario = produto.preco;
  const [total, setTotal] = useState(0);
  const [observacao,setObservacao] = useState('');
    

  useEffect(() => {
    CalculaTotal();
  }, [quantidade]);

  const IncreaseQuantity = () => {
    setQuantidade(quantidade + 1);
  };

  const DecreaseQuantity = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };
  const CalculaTotal = () => {
    let total = quantidade * valorUnitario;
    setTotal(total);
  };

  const adicionarClick = () => {
    
    const id = itensPedido.length > 0 ? itensPedido.length+1 : 1;
    const novoItemPedido = { id,quantidade,total,observacao,produto };
    addItemPedido(novoItemPedido);
    navigate('/');
    
  }

  return (
    <main className={styles.container}>
      
      <div className={styles.corpo}>
      <MdClose onClick={()=>{navigate('/');}} style={{position:'absolute',top:10,right:10}} size={22} />
        <div className={styles.linhaNome}>
            <div className={styles.nome}>{produto.nome}</div>
        </div>
        <img className={styles.imagemProduto} alt="imagem do produto" src={`${Api.base_storage}/${produto.imagem}`}  />
        <div className={styles.ingredientes}>{produto.descricao}</div>
        <div className={styles.containerObservacao}>
          <p className={styles.observacaoLabel}>Observações:</p>
          <textarea
            className={styles.inputObservacao}
            placeholder="viajar na maionese..."
            onChange={(e)=> setObservacao(e.target.value)}
          ></textarea>
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
    </main>
  );


}

export default AddProduct