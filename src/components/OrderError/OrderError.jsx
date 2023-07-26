import React, {useContext} from 'react';
import styles from "./styles.module.css";
import { ImSad } from "react-icons/im";
import { useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import DataContext from '../../context/DataContext';


const OrderError = () => {
    const navigate = useNavigate();
    const {slug} = useContext(DataContext);
 
    return (
        <main className={styles.container}>
            <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
            <div className={styles.body}>
                    <ImSad className={styles.icon} size={80} />
                    <p>Houve um problema ao enviar o seu pedido.</p>
                    <p>Tente novamente por favor.</p>
                   
                    
            </div>
           
        </main>
      )
}

export default OrderError