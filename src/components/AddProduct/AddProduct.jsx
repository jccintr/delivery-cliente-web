import React, { useState, useEffect,useContext} from 'react';
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Api from '../../Api';
import SelectFieldGenerico from '../SelectFieldGenerico/SelectFieldGenerico';
import AdicionalCard from '../AdicionalCard/AdicionalCard';
import DataContext from '../../context/DataContext';
import MessageBox from '../MessageBox/MessageBox';



const AddProduct = ({itensPedido,addItemPedido}) => {
  const {slug} = useContext(DataContext);
  const navigate = useNavigate();
  const params = useLocation();
  const {produto} = params.state;
  const [quantidade, setQuantidade] = useState(1);
  const valorUnitario = produto.preco;
  const [totalAdicional,setTotalAdicional] = useState(0);
  const [total, setTotal] = useState(0);
  const [observacao,setObservacao] = useState('');
  const [selectFields,setSelectFields] = useState([]);
  const [adicionais,setAdicionais] = useState([]);
  const [dialogMessage,setDialogMessage] = useState('');
  const [dialogVisible,setDialogVisible] = useState(false);
  const [titleMessageBox,setTitleMessageBox] = useState('');
  
  useEffect(() => {
    criaArrayAdicionais();
  }, []);

  useEffect(() => {
    CalculaTotal();
  }, [quantidade,totalAdicional]);

  useEffect(() => {
    CalculaTotalAdicionais();
  }, [adicionais]);

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
  
  const CalculaTotalAdicionais = () => {
     let total = 0;
     for (let i=0;i<adicionais.length;i++){
        if(adicionais[i].selecionado){
          total = total + parseFloat(adicionais[i].valor);
        }
     }
     setTotalAdicional(total);
  };

  const showModalDialog = (title,mensagem) => {
      setTitleMessageBox(title);
      setDialogMessage(mensagem);
      setDialogVisible(true);
  }

  const adicionarClick = () => {
    
    if (produto.obrigatorios.length !== selectFields.length) {
        showModalDialog('Atenção','Selecione todos os itens obrigatórios por favor.');
    } else {

      let obrigatorios = '';
      for(let i=0;i<selectFields.length;i++){
         obrigatorios += selectFields[i].name + ' : ' + selectFields[i].value + ';';
      }
      obrigatorios = obrigatorios.slice(0,-1);

      let strAdicionais = '';
      for(let i=0;i<adicionais.length;i++){
         if(adicionais[i].selecionado){
            strAdicionais += adicionais[i].nome + ' : ' + adicionais[i].valor + ';';
         }
      }
      strAdicionais = strAdicionais.slice(0,-1);

      const id = itensPedido.length > 0 ? itensPedido.length+1 : 1;
      const novoItemPedido = { id,quantidade,total,obrigatorios,adicionais: strAdicionais,observacao,produto };
      addItemPedido(novoItemPedido);
      navigate(`/${slug}`);
    }
  
    
  }

  const onSelectChange = (e) => {

    const newSelectObject = {name: e.target.name,value: e.target.value};
    let newSelectArr =  selectFields.filter((item)=> item.name !== newSelectObject.name);
    let n =  [...newSelectArr, newSelectObject];
    setSelectFields(n);
   
  }


  const onAdicionalChange = (id) => {
   
    let n = adicionais;
    
    for (let i=0;i<n.length;i++){
        if(n[i].id==id){
           n[i].selecionado = !n[i].selecionado;
        }
    }
    
    setAdicionais(n);
    CalculaTotalAdicionais();
    CalculaTotal();
  }

  const criaArrayAdicionais = () => {
       let n = [];
      
       for (let i=0;i<produto.adicionais.length;i++){
         const newAdicional = {id:i,nome: produto.adicionais[i].nome,valor: produto.adicionais[i].valor,selecionado: false}
         n.push(newAdicional);
       }

       setAdicionais(n);
  }

  return (
    <main className={styles.container}>
        <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
        <div className={styles.body}>
          <div className={styles.linhaNome}>
              <div className={styles.nome}>{produto.nome}</div>
          </div>
          {produto.imagem&&<img className={styles.imagemProduto} alt="imagem do produto" src={`${Api.base_storage}/${produto.imagem}`}  />}
          <div className={styles.ingredientes}>{produto.descricao}</div>
          
          {produto.obrigatorios.map( (obrigatorio,index)=>(<SelectFieldGenerico key={index} index={index} label={obrigatorio.nome} data={obrigatorio.opcoes} onSelect={onSelectChange}/>)) }
          
          {produto.adicionais.length>0&&<div className={styles.containerObservacao}>
            <p className={styles.observacaoLabel}>Adicione ingredientes:</p>
          </div>}
          {adicionais.map((adicional,index)=><AdicionalCard onChange={onAdicionalChange} key={index} adicional={adicional}/>)}
          
          
          <div className={styles.containerObservacao}>
            <p className={styles.observacaoLabel}>Observações:</p>
            <textarea
              className={styles.inputObservacao}
              
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
        {dialogVisible&&<MessageBox title={titleMessageBox} mensagem={dialogMessage} setDialogVisible={setDialogVisible}/>}
    </main>
  );


}

export default AddProduct