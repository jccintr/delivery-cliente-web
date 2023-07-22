import React from 'react';
import styles from "./styles.module.css";

const AdicionalCard = ({adicional,onChange}) => {
  return (
     <div className={styles.container}>
        <div>
           <input type="checkbox" onChange={onChange} isChecked={adicional.selecionado} id={adicional.nome} name={adicional.nome} value={adicional.id} style={{marginRight:10}}/>
           <label className={styles.nome} for={adicional.nome}>{adicional.nome}</label> 
        </div>
        <p className={styles.valor}>R$ {adicional.valor}</p>
     </div>
  )
}

export default AdicionalCard