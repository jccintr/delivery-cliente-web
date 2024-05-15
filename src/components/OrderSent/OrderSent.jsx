import React, {useContext} from 'react';
import styles from "./styles.module.css";
import { BsCheckCircleFill } from "react-icons/bs";
import { useNavigate,useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import DataContext from '../../context/DataContext';

const OrderSent = () => {
  const {slug,tenant} = useContext(DataContext);  // chave_pix favorecido_pix
  const navigate = useNavigate();
 const params = useLocation();
  const {pix} = params.state;

  return (
    <main className={styles.container}>
        <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
        <div className={styles.body}>
                <BsCheckCircleFill className={styles.icon} size={80} />
                <p>O seu pedido foi enviado com sucesso !</p>
                {pix && tenant.chave_pix!==null &&<div className={styles.pixArea}>
                     <p>Chave Pix para pagamento</p>
                     <span>{tenant.chave_pix}</span>
                     <span>{tenant.favorecido_pix}</span>
                     <button className={styles.botaoPix}  onClick={()=>navigator.clipboard.writeText(tenant.chave_pix)}>Copiar Chave Pix</button>
                </div>}
                <p>Obrigado por comprar conosco !</p>
               
                <button className={styles.botao}  onClick={()=>{navigate('/status');}}>Acompanhar a situação do pedido</button>
                
        </div>
       
    </main>
  )
}

export default OrderSent