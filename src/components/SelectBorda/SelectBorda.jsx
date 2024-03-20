import React from 'react';
import styles from "./styles.module.css";

const SelectBorda = ({label,bordas,tamanho,onSelect}) => {
 
    return (
        <div className={styles.container}>
    
           <span className={styles.label}>{label}</span>
           <div className={styles.selectContainer}>
           <select className={styles.select} onChange={(e)=>{onSelect(e.target.value)}}>
                <option value={0}>Selecione por favor</option>
                {bordas.map((borda) => (
                <option key={borda.id} value={borda.id}>{borda.nome} R$ {tamanho===1?borda.grande:borda.broto}</option>
                ))}
            </select>
           </div>
           
    
        </div>
      )



}

export default SelectBorda