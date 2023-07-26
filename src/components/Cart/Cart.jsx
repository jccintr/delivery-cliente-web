import React, {useState,useEffect,useContext} from 'react'
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CartItens from '../CartItens/CartItens';
import EmptyCart from '../EmptyCart/EmptyCart';
import DataContext from '../../context/DataContext';

const Cart = ({itensPedido,deleteItemPedido}) => {
    const {slug} = useContext(DataContext);
    const navigate = useNavigate();
    const [totalPedido,setTotalPedido] = useState(0);


    useEffect(() => {
        setTotalPedido(itensPedido.reduce( (n,{total}) => n + total,0));
      }, [itensPedido]);
      

    return (
        <main className={styles.container}>
            <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
            {itensPedido.length===0&&<EmptyCart/>}
            {itensPedido.length>0&&<div className={styles.body}>
            
                <div className={styles.areaTitulo}>
                    <div className={styles.titulo}>Meu Carrinho</div>
                </div>
                <CartItens itensPedido={itensPedido} deleteItemPedido={deleteItemPedido}/>
                <div className={styles.totalArea}>
                   <p className={styles.totalText}>Total: R$ {totalPedido.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <button className={styles.botao}  onClick={()=>{navigate(`/${slug}`);}}>Adicionar Itens</button>
            </div>}
       </main>
      );


}

export default Cart