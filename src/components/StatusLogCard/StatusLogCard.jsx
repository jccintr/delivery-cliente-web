import React from 'react';
import styles from "./styles.module.css";
import { FaCircle } from "react-icons/fa";

const StatusLogCard = ({log}) => {
  
    return (
        <div className={styles.container}>
            <FaCircle style={{marginRight: 10}} size={14} color={log.status_pedido.cor} />
           <span style={{fontSize:14}}>{log.data} {log.status_pedido.descricao}</span> 
       </div>
      )



}

export default StatusLogCard