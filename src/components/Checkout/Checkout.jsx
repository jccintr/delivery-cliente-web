import React, {useState,useContext,useEffect} from 'react';
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import InputField from '../InputField/InputField';
import DataContext from '../../context/DataContext';
import SelectField from '../SelectField/SelectField';

const Checkout = ({itensPedido}) => {
    const navigate = useNavigate();
    const {taxas,pagamentos} = useContext(DataContext);
    const [entregar,setEntregar] = useState(true);
    const [nome,setNome] = useState('');
    const [telefone,setTelefone] = useState('');
    const [endereco,setEndereco] = useState('');
    const [totalProdutos,setTotalProdutos] = useState(0);
    const [taxaEntrega,setTaxaEntrega] = useState(0);
    const [totalPedido,setTotalPedido] = useState(0);
    const [formaPagamento,setFormaPagamento] = useState('Dinheiro');
    

    useEffect(() => {
        setTotalProdutos(itensPedido.reduce( (n,{totalProduto}) => n + totalProduto,0));
        setTotalPedido(totalProdutos+taxaEntrega);
      }, [itensPedido,taxaEntrega,totalProdutos]);

    const onSelectTaxa = (id) => {
        let valor = 0;
        taxas.forEach(taxa => {
            if(taxa.id == id) valor = taxa.valor*1;
        });
        setTaxaEntrega(valor);
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
                <div style={{display: 'flex',flexDirection:'row',justifyContent:'flex-end',width:300,paddingTop:5,paddingBottom:0}}>
                   <p style={{margin:0,padding:0,fontWeight:'normal'}}>Total dos Produtos: R$ {totalProdutos.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div style={{display: 'flex',flexDirection:'row',justifyContent:'flex-end',width:300,paddingTop:5,paddingBottom:0}}>
                   <p style={{margin:0,padding:0,fontWeight:'normal'}}>Taxa de Entrega: R$ {taxaEntrega.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                
                </>}
                <div style={{display: 'flex',flexDirection:'row',justifyContent:'flex-end',width:300,paddingTop:5,paddingBottom:20}}>
                    <p style={{margin:0,padding:0}}>Total a Pagar: R$ {totalPedido.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <button className={styles.botao}  onClick={()=>{navigate('/');}}>ENVIAR O PEDIDO</button>
            </div>
       </main>
      );





}

export default Checkout

/*
nome
telefone

endereco

*/