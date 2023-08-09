import React, {useState,useEffect,useContext} from 'react';
import styles from "./styles.module.css";
import Api from '../../Api';
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DataContext from '../../context/DataContext';
import { FaUser,FaWhatsapp,FaConciergeBell,FaMotorcycle } from "react-icons/fa";
import { BsCalendar3 } from "react-icons/bs";
import ItemPedidoCard from '../ItemPedidoCard/ItemPedidoCard';
import StatusLogCard from '../StatusLogCard/StatusLogCard';
import ReactLoading from 'react-loading';


const Retira = () => {
   
  return (
      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
           <FaConciergeBell size={14} color="green" />
           <span style={{fontSize:14,marginLeft:5,color: 'green'}}>Retirar no Balcão</span>
      </div>
  )
}

const Delivery = () => {
   
  return (
      <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
           <FaMotorcycle size={14} color="red" />
           <span style={{fontSize:14,marginLeft:5,color: 'red'}}>Delivery</span>
      </div>
  )
}


const LastOrder = () => {
  const navigate = useNavigate();
  const {slug} = useContext(DataContext);
  const [pedido,setPedido] = useState({});
  const [totalProdutos,setTotalProdutos] = useState(0);
  const [taxaEntrega,setTaxaEntrega] = useState(0);
  
  const [itensPedido,setItensPedido] = useState([]);
  const [statusLog,setStatusLog] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  //const [id,setId] = useState(null);
  
  /*
  const getPedido = async (id) => {
    
      let response = await Api.getPedido(id);
      let json = await response.json();
      console.log(JSON.stringify(json));
      setPedido(json);
}

useEffect(() => {
  let idPedido = localStorage.getItem('lastOrder');
  if (idPedido) {
    // setId(idPedido)
     getPedido(idPedido);
  }
  }, []);
*/

  useEffect(()=>{
    const getPedido = async (id) => {
     // setIsLoading(true);
     let response = await Api.getPedido(id);
      if(response.status===200) {
        let json = await response.json();
        setPedido(json);
        setTotalProdutos(json.total);
        setTaxaEntrega(json.taxa_entrega);
       
        setItensPedido(json.itens_pedido);
        setStatusLog(json.status_pedido_log);
      }
     // setIsLoading(false);
    }
    let idPedido = localStorage.getItem('lastOrder');
    getPedido(idPedido);

 },[]);

const onRefresh = async () => {
  setIsLoading(true);
  let id = localStorage.getItem('lastOrder');
  let response = await Api.getPedido(id);
  if(response.status===200) {
    let json = await response.json();
    setPedido(json);
    setTotalProdutos(json.total);
    setTaxaEntrega(json.taxa_entrega);
    setItensPedido(json.itens_pedido);
    setStatusLog(json.status_pedido_log);
  }
  setIsLoading(false);
}


  return (
    <main className={styles.container}>
        <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
        <div className={styles.body}>
              
              <div className={styles.area}>
                   <div className={styles.numeroPedido}>Pedido # {pedido.token}</div>
              </div>
              <div className={styles.area}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                     <BsCalendar3 size={20} color="gray"/>
                     <span className={styles.nomeText}>{pedido.data}</span>
                  </div>
                  {pedido.delivery?<Delivery/>:<Retira/>}
              </div>
              <div className={styles.area}>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                     <FaUser size={20} color="gray"/>
                     <span className={styles.nomeText}>{pedido.nome}</span>
                  </div>
                  <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                     <FaWhatsapp size={20} color="green"/>
                     <span className={styles.telefoneText}>{pedido.telefone}</span>
                  </div>
              </div>
              <div className={styles.itensArea}>
                   <div className={styles.numeroPedido}>Itens do Pedido</div>
                   {itensPedido.map((item,index,arr)=><ItemPedidoCard key={item.id} last={index===(arr.length-1)} item={item}/>)}
              </div>
              <div className={styles.itensArea}>
                   <div className={styles.numeroPedido}>Totais do Pedido</div>
                   <div className={styles.totalLine}>
                      <span style={{fontSize:14}}>Total dos Produtos:</span>
                      <span style={{fontSize:14}}>R$ {totalProdutos.toFixed(2)}</span>
                   </div>
                   {pedido.delivery&&<div className={styles.totalLine}>
                      <span style={{fontSize:14}}>Taxa de Entrega:</span>
                      <span style={{fontSize:14}}>R$ {taxaEntrega}</span>
                   </div>}
                   <div className={styles.totalLine}>
                      <span style={{fontWeight:'bold',fontSize:14}}>Total do Pedido:</span>
                      <span style={{fontWeight:'bold',fontSize:14}}>R$ {(totalProdutos*1+taxaEntrega*1).toFixed(2)}</span>
                   </div>
              </div>
              <div className={styles.itensArea}>
                  <div className={styles.numeroPedido}>Forma de Pagamento</div>
                  <span style={{width:'100%',textAlign:'left',fontSize:14}}>{pedido.forma_pagamento}</span>
              </div>
              {pedido.delivery&&<div className={styles.itensArea}>
                  <div className={styles.numeroPedido}>Endereço para Entrega</div>
                  <span style={{width:'100%',textAlign:'left',fontSize:14}}>{pedido.endereco} - {pedido.bairro}</span>
              </div>}
              {pedido.observacao&&<div className={styles.itensArea}>
                  <div className={styles.numeroPedido}>Observações</div>
                  <span style={{width:'100%',textAlign:'left',fontSize:14}}>{pedido.observacao}</span>
              </div>}
              <div className={styles.itensArea}>
                  <div className={styles.numeroPedido}>Status do Pedido</div>
                  {statusLog.map((item)=><StatusLogCard log={item} key={item.id} />)}
              </div>
              <button className={styles.botao}  onClick={onRefresh}>{isLoading?<ReactLoading type="bars" color="#ffffff" height={30} width={30}/>:'ATUALIZAR'}</button>
        </div>
    </main>    
    
  )
}

export default LastOrder