import React, {useState,useContext,useEffect} from 'react';
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import InputField from '../InputField/InputField';
import DataContext from '../../context/DataContext';
import SelectField from '../SelectField/SelectField';
import SelectPagamento from '../SelectPagamento/SelectPagamento';
import Api from '../../Api';
import ReactLoading from 'react-loading';
import MessageBox from '../MessageBox/MessageBox';
import { FaRegCheckCircle } from "react-icons/fa";

const insertPhoneMask = (phone) => {

  const noMask = phone.replace(/\D/g, '');
  const { length } = noMask;
  if (length <= 11) {
    return noMask
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2');
  }
  return phone;

}



const Checkout = ({itensPedido,setItensPedido}) => {
    const navigate = useNavigate();
    const {tenant,taxas,pagamentos,slug,setLastOrder} = useContext(DataContext);
    const [entregar,setEntregar] = useState(true);
    const [nome,setNome] = useState('');
    const [telefone,setTelefone] = useState(localStorage.getItem('pedidoTelefone')==null?'':localStorage.getItem('pedidoTelefone'));
    const [endereco,setEndereco] = useState('');
    const [totalProdutos,setTotalProdutos] = useState(0);
    const [taxaEntrega,setTaxaEntrega] = useState(0);
    const [taxaId,setTaxaId] = useState(0);
    const [pagamentoId,setPagamentoId] = useState(0);
    const [totalPedido,setTotalPedido] = useState(0);
    const [observacao,setObservacao] = useState('');
    const [formaPagamento,setFormaPagamento] = useState('Dinheiro');
    const [isLoading,setIsLoading] = useState(false);
    const [titleMessageBox,setTitleMessageBox] = useState('');
    const [dialogMessage,setDialogMessage] = useState('');
    const [dialogVisible,setDialogVisible] = useState(false);
  
    useEffect(() => {
        const nome = localStorage.getItem('pedidoNome');
        if (nome){
            setNome(nome);
        }
        // const telefone = localStorage.getItem('pedidoTelefone');
        // if (telefone){
        //     setTelefone(telefone);
        // }
        const endereco = localStorage.getItem('pedidoEndereco');
        if (endereco){
            setEndereco(endereco);
        }

     }, []);

    useEffect(() => {
         setTelefone(insertPhoneMask(telefone));
      }, [telefone]);

    useEffect(() => {
        setTotalProdutos(itensPedido.reduce( (n,{total}) => n + total,0));
        setTotalPedido(totalProdutos+taxaEntrega);
      }, [itensPedido,taxaEntrega,totalProdutos]);

    const onSelectTaxa = (id) => {
        let valor = 0;
        setTaxaId(id);
        taxas.forEach(taxa => {
            if(taxa.id == id) valor = taxa.valor*1;
        });
        setTaxaEntrega(valor);
    }  

    const showModalDialog = (title,mensagem) => {
        setTitleMessageBox(title);
        setDialogMessage(mensagem);
        setDialogVisible(true);
    }

    const onSelectPagamento = (id) => {
        setPagamentoId(id)
        pagamentos.forEach(pagamento => {
            if(pagamento.id == id) setFormaPagamento(pagamento.nome);
        });
    }  

    const onEnviarPedido = async () => {
        
        if (nome.trim().length === 0 || telefone.trim().length === 0){
            showModalDialog('Atenção','Informe o seu nome e telefone por favor.');
            return; 
        }
        if (entregar){
            if (endereco.trim().length===0) { showModalDialog('Atenção','Informe o seu endereço por favor'); return;}
            if (taxaId===0) { showModalDialog('Atenção','Selecione o bairro por favor.');  return;}
       }

       if (pagamentoId===0) { showModalDialog('Atenção','Selecione a forma de pagamento por favor.'); return;}

       setIsLoading(true); 
       let response = await Api.addPedido(entregar,tenant.id,nome,telefone,endereco,taxaId,pagamentoId,observacao,itensPedido);
       if(response.status===201){
          const json = await response.json();
          
          //localStorage.setItem('lastOrder', json.id); 
          localStorage.setItem('pedidoNome', nome); 
         
          localStorage.setItem('pedidoTelefone', telefone); 
          localStorage.setItem('pedidoEndereco', endereco); 
          setLastOrder(json.id); 
          setItensPedido([]);
          setIsLoading(false);
          navigate('/ordersent',{state: {pedido: json,pix: formaPagamento=='Pix'?true:false}});
        } else {
        setIsLoading(false);
        navigate('/ordererror');
       }
       
    }

    return (
        <main className={styles.container}>
            <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
            
            <div className={styles.body}>
            
                <div className={styles.areaTitulo}>
                    <div className={styles.titulo}>Finalizando Pedido</div>
                </div>
                <div className={styles.deliveryArea} >
                    <button className={entregar?styles.selectButtonChecked:styles.selectButton} onClick={()=>setEntregar(true)}>{entregar?<FaRegCheckCircle />:''}ENTREGAR</button>
                    <button className={!entregar?styles.selectButtonChecked:styles.selectButton} onClick={()=>{setEntregar(false);setTaxaEntrega(0);}}>{!entregar?<FaRegCheckCircle />:''}RETIRAR</button>
                </div>
                <InputField label="Nome:" placeholder="Informe o seu nome" value={nome} setValue={setNome}/>
                <InputField label="Telefone:" placeholder="Informe o seu WhatsApp com DDD" value={telefone} setValue={setTelefone}/>
                {entregar&&<>
                <InputField label="Endereço:" placeholder="Informe o endereço para entrega" value={endereco} setValue={setEndereco}/>
                <SelectField taxas={taxas} label="Bairro:" onSelect={onSelectTaxa}/>
                <div className={styles.valuesTextArea}>
                   <p className={styles.valuesText}>Total dos Produtos: R$ {totalProdutos.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className={styles.valuesTextArea}>
                   <p className={styles.valuesText}>Taxa de Entrega: R$ {taxaEntrega.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                
                </>}
                <div style={{display: 'flex',flexDirection:'row',justifyContent:'flex-end',width:300,paddingTop:5,paddingBottom:20}}>
                    <p style={{margin:0,padding:0}}>Total a Pagar: R$ {totalPedido.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <SelectPagamento pagamentos={pagamentos} label="Forma de Pagamento:" onSelect={onSelectPagamento}/>
                <InputField label="Observações:" placeholder="Mandar troco para 50 reais..." value={observacao} setValue={setObservacao}/>
                <button className={styles.botao}  onClick={onEnviarPedido}>{isLoading?<ReactLoading type="bars" color="#ffffff" height={30} width={30}/>:'ENVIAR O PEDIDO'}</button>
            </div>
            {dialogVisible&&<MessageBox title={titleMessageBox} mensagem={dialogMessage} setDialogVisible={setDialogVisible}/>}
       </main>
      );





}

export default Checkout

/*
                          
nome  (r,e)
telefone (r,e)
endereco (e)
observacao (r,e) 
idTaxa (e)
idPagamento (r,e)
itensPedido [] (r,e)

*/