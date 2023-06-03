import React, {useState,useContext,useEffect} from 'react';
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import InputField from '../InputField/InputField';
import DataContext from '../../context/DataContext';
import SelectField from '../SelectField/SelectField';
import SelectPagamento from '../SelectPagamento/SelectPagamento';
import Api from '../../Api';

const Checkout = ({itensPedido,setItensPedido}) => {
    const navigate = useNavigate();
    const {taxas,pagamentos} = useContext(DataContext);
    const [entregar,setEntregar] = useState(true);
    const [nome,setNome] = useState('');
    const [telefone,setTelefone] = useState('');
    const [endereco,setEndereco] = useState('');
    const [totalProdutos,setTotalProdutos] = useState(0);
    const [taxaEntrega,setTaxaEntrega] = useState(0);
    const [taxaId,setTaxaId] = useState(0);
    const [pagamentoId,setPagamentoId] = useState(0);
    const [totalPedido,setTotalPedido] = useState(0);
    const [observacao,setObservacao] = useState('');
    const [formaPagamento,setFormaPagamento] = useState('Dinheiro');
    

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

    const onSelectPagamento = (id) => {
        setPagamentoId(id)
        pagamentos.forEach(pagamento => {
            if(pagamento.id == id) setFormaPagamento(pagamento.nome);
        });
    }  

    const onEnviarPedido = async () => {
        
        if (nome.trim().length === 0 || telefone.trim().length === 0){
            alert('Informe o seu nome e telefone por favor.');
            return; 
        }
        if (entregar){
            if (endereco.trim().length===0) { alert('Informe o seu endereço por favor'); return;}
            if (taxaId===0) { alert('Selecione o bairro por favor.'); return;}
            if (pagamentoId===0) { alert('Selecione a forma de pagamento por favor.'); return;}
        }
        
        // alert('enviado');
        /*
        if (entregar && taxaId===null){
            alert('Selecione o bairro por favor.');
            
        } else {
            alert('Seu pedido foi enviado.');
        }
        */
        
       let response = await Api.addPedido(entregar,1,nome,telefone,endereco,taxaId,pagamentoId,observacao,itensPedido);
       if(response.status===201){
          const json = await response.json();
          setItensPedido([]);
          navigate('/ordersent',{state: {pedido: json.pedido}});
          
       } else {
         alert('Falha ao enviar o pedido. Status ' + response.status);
       }
       
    }

    return (
        <main className={styles.container}>
            <MdClose onClick={()=>{navigate('/');}} style={{position:'absolute',top:10,right:10}} size={22} />
            
            <div className={styles.body}>
            
                <div className={styles.areaTitulo}>
                    <div className={styles.titulo}>Finalizando Pedido</div>
                </div>
                <div className={styles.deliveryArea} >
                    <button className={entregar?styles.botaoEntregarSelected:styles.botaoEntregar} onClick={()=>setEntregar(true)}>ENTREGAR</button>
                    <button className={entregar?styles.botaoEntregar:styles.botaoEntregarSelected} onClick={()=>{setEntregar(false);setTaxaEntrega(0);}}>RETIRAR</button>
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
                <button className={styles.botao}  onClick={onEnviarPedido}>ENVIAR O PEDIDO</button>
            </div>
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