import React, { useState, useEffect,useContext} from 'react';
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Api from '../../Api';
import SelectFieldGenerico from '../SelectFieldGenerico/SelectFieldGenerico';
import AdicionalPizzaCard from '../AdicionalPizzaCard/AdicionalPizzaCard';
import DataContext from '../../context/DataContext';
import MessageBox from '../MessageBox/MessageBox';
import { FaRegCheckCircle } from "react-icons/fa";


const Pizza = ({pizza,tamanho}) => {
   return (
      <div className={styles.pizzaContainer}>
        <p className={styles.pizzaNome}>{pizza.nome}</p>
        <p className={styles.pizzaNome}>R$ {tamanho===1?pizza.grande:pizza.broto}</p>
      </div>
   );
}


const AddPizza = ({itensPedido,addItemPedido}) => {
    const {slug,pizzaSabor1,pizzaSabor2,tamanhoPizza,setTamanhoPizza,saboresPizza,setSaboresPizza,adicionaisPizza} = useContext(DataContext);
    const navigate = useNavigate();
    const params = useLocation();
    const [quantidade, setQuantidade] = useState(1);
    const valorUnitario = 10.00 //produto.preco;
    const [totalAdicional,setTotalAdicional] = useState(0);
    const [total, setTotal] = useState(0);
    const [observacao,setObservacao] = useState('');
    const [selectFields,setSelectFields] = useState([]);
    const [adicionais,setAdicionais] = useState([]);
    const [titleMessageBox,setTitleMessageBox] = useState('');
   

    useEffect(() => {
      criaArrayAdicionais();
    }, []);

    useEffect(() => {
      CalculaTotal();
    }, [quantidade,tamanhoPizza,pizzaSabor1,pizzaSabor2,saboresPizza]);
   
    

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
      
        let total = 0
        if (saboresPizza === 1 && pizzaSabor1 !== null){

          if(tamanhoPizza===1){
              total = quantidade * (pizzaSabor1.grande + totalAdicional);
          } else {
            total = quantidade * (pizzaSabor1.broto + totalAdicional);
          }   
          setTotal(total);
          return;
        }

        if (saboresPizza === 2 && pizzaSabor1 !== null && pizzaSabor2 !== null){

          if(tamanhoPizza===1){
            if(pizzaSabor2.grande > pizzaSabor1.grande){
              total = quantidade * pizzaSabor2.grande;
            } else {
              total = quantidade * pizzaSabor1.grande;
            }
          }
          else {
            if(pizzaSabor2.grande > pizzaSabor1.grande){
              total = quantidade * pizzaSabor2.broto;
            } else {
              total = quantidade * pizzaSabor1.broto;
            }
          }
          setTotal(total);
          return;
        }

      };

      const CalculaTotalAdicionais = () => {
        let total = 0;
        for (let i=0;i<adicionais.length;i++){
           if(adicionais[i].selecionado){
             if(tamanhoPizza===1){
                 total = total + parseFloat(adicionais[i].grande);
             } else {
               total = total + parseFloat(adicionais[i].broto);
             }
           }
        }
        setTotalAdicional(total);
     };

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
       
        for (let i=0;i<adicionaisPizza.length;i++){
          const newAdicional = {id:i,nome: adicionaisPizza[i].nome,broto: adicionaisPizza[i].broto,grande: adicionaisPizza[i].grande,selecionado: false}
          n.push(newAdicional);
        }
 
        setAdicionais(n);
   }


  return (
    <main className={styles.container}>
        <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
        <div className={styles.body}>
          <div className={styles.titleContainer}>
              <div className={styles.title}>Pizzas</div>
          </div>
          <div className={styles.deliveryArea}>
              <div className={styles.subTitle}>Escolha o tamanho da pizza:</div>
          </div>
          <div className={styles.deliveryArea} >
               <button className={tamanhoPizza===1?styles.selectButtonChecked:styles.selectButton} onClick={()=>setTamanhoPizza(1)}>{tamanhoPizza===1?<FaRegCheckCircle />:''}Grande</button>
               <button className={tamanhoPizza===2?styles.selectButtonChecked:styles.selectButton} onClick={()=>setTamanhoPizza(2)}>{tamanhoPizza===2?<FaRegCheckCircle />:''}Broto</button>
          </div>
          <div className={styles.deliveryArea}>
              <div className={styles.subTitle}>Escolha a quantidade de sabores:</div>
          </div>
          <div className={styles.deliveryArea} >
               <button className={saboresPizza===1?styles.selectButtonChecked:styles.selectButton} onClick={()=>setSaboresPizza(1)}>{saboresPizza===1?<FaRegCheckCircle />:''}Um Sabor</button>
               <button className={saboresPizza===2?styles.selectButtonChecked:styles.selectButton} onClick={()=>setSaboresPizza(2)}>{saboresPizza===2?<FaRegCheckCircle />:''}Dois Sabores</button>
          </div>
          <div className={styles.deliveryArea}>
              <div className={styles.subTitle}>{saboresPizza===1?'Escolha o sabor:':'Escolha os sabores:'}</div>
          </div>
          <button className={styles.selectFlavorButton} onClick={()=>navigate("/pizzas",{ state: { sabor: 1 } })}>{!pizzaSabor1?saboresPizza===2?'Selecione o primeiro sabor':'Selecione o sabor':<Pizza pizza={pizzaSabor1} tamanho={tamanhoPizza}/>}</button>
          {saboresPizza===2&&<button className={styles.selectFlavorButton} onClick={()=>navigate("/pizzas",{ state: { sabor: 2 } })}>{!pizzaSabor2?'Selecione o segundo sabor':<Pizza pizza={pizzaSabor2} tamanho={tamanhoPizza}/>}</button>}
          
          {adicionais.length>0&&<div className={styles.containerObservacao}>
            <p className={styles.observacaoLabel}>Adicione ingredientes:</p>
          </div>}
          {adicionais.map((adicional,index)=><AdicionalPizzaCard onChange={onAdicionalChange} key={index} adicional={adicional} tamanhoPizza={tamanhoPizza}/>)}
          
          
          
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
        
    </main>
  )
}

export default AddPizza