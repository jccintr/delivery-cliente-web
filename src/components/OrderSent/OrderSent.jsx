import React, {useContext} from 'react';
import styles from "./styles.module.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import DataContext from '../../context/DataContext';

const OrderSent = () => {
  const {slug} = useContext(DataContext);
  const navigate = useNavigate();
 // const params = useLocation();
  //const {pedido} = params.state;

  return (
    <main className={styles.container}>
        <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
        <div className={styles.body}>
                <BsCheckCircleFill className={styles.icon} size={80} />
                <p>O seu pedido foi enviado com sucesso !</p>
                <p>Obrigado por comprar conosco !</p>
                
                <button className={styles.botao}  onClick={()=>{navigate('/status');}}>Acompanhar a situação do pedido</button>
                
        </div>
       
    </main>
  )
}

export default OrderSent