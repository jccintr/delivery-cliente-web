import React from 'react';
import styles from "./styles.module.css";

const SelectFieldGenerico = ({label,data,index,onSelect}) => {
 
    return (
        <div className={styles.container}>
    
           <span className={styles.label}>{label}:</span>
           <div className={styles.selectContainer}>
           <select name={label} className={styles.select} onChange={(e)=>{onSelect(e)}}>
                <option value={0}>Selecione por favor</option>
                {data.map((dado,index) => (
                <option key={index} value={dado}>{dado}</option>
                ))}
            </select>
           </div>
           
    
        </div>
      )



}

export default SelectFieldGenerico