import React from 'react';
import styles from "./styles.module.css";

const ModalDialog = ({mensagem,setDialogVisible}) => {


  return (
    <div className={styles.modalOverlay} onClick={()=>setDialogVisible(false)}>
        <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
             <span className={styles.mensagem} >{mensagem}</span>
             <button onClick={() => setDialogVisible(false)}>
               Fechar
             </button>
        </div>
    </div>
  )
}

export default ModalDialog