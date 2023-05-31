import React from 'react';
import styles from "./styles.module.css";

const SelectField = ({label,taxas,onSelect}) => {
 
    return (
        <div className={styles.container}>
    
           <span className={styles.label}>{label}</span>
           <div className={styles.selectContainer}>
           <select className={styles.select} onChange={(e)=>{onSelect(e.target.value)}}>
                <option value={0}>Selecione por favor</option>
                {taxas.map((taxa) => (
                <option key={taxa.id} value={taxa.id}>{taxa.bairro} R$ {taxa.valor.toLocaleString(undefined, { minimumFractionDigits: 2 })}</option>
                ))}
            </select>
           </div>
           
    
        </div>
      )



}

export default SelectField