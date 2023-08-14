import React from 'react';
import styles from "./styles.module.css";

const MessageBox = ({title,mensagem,setDialogVisible}) => {


  return (
    <div className={styles.modalOverlay} onClick={()=>setDialogVisible(false)}>
        <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
             <div className={styles.titleContainer}><span className={styles.title}>{title}</span></div>
             <div className={styles.content}>
                <span className={styles.mensagem} >{mensagem}</span>
                <button className={styles.botao} onClick={() => setDialogVisible(false)}>Fechar</button> 
             </div>
             
        </div>
    </div>
  )
}

export default MessageBox