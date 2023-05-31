import React from 'react';
import styles from "./styles.module.css";

const SelectPagamento = ({label,pagamentos,onSelect}) => {
 
    return (
        <div className={styles.container}>
    
           <span className={styles.label}>{label}</span>
           <div className={styles.selectContainer}>
           <select className={styles.select} onChange={(e)=>{onSelect(e.target.value)}}>
                <option value={0}>Selecione por favor</option>
                {pagamentos.map((pagamento) => (
                <option key={pagamento.id} value={pagamento.id}>{pagamento.nome}</option>
                ))}
            </select>
           </div>
           
    
        </div>
      )



}

export default SelectPagamento