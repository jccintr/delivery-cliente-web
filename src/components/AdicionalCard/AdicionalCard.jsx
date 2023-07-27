import React,{useContext} from 'react';
import styles from "./styles.module.css";
import { ImCheckboxUnchecked,ImCheckboxChecked } from "react-icons/im";
import DataContext from '../../context/DataContext';

const AdicionalCard = ({adicional,onChange}) => {
   const {tenant} = useContext(DataContext);
  return (
     <div className={styles.container} onClick={()=>onChange(adicional.id)}>
        <div className={styles.checkContainer}>
           {adicional.selecionado?<ImCheckboxChecked size={18} color={tenant.cor_fundo}/>:<ImCheckboxUnchecked size={18} color={tenant.cor_fundo}/>}
           <span className={styles.nome}>{adicional.nome}</span>           
        </div>
        <p className={styles.valor}>R$ {adicional.valor}</p>
     </div>
  )
}

export default AdicionalCard

/*

import React from 'react';
import styles from "./styles.module.css";
import { FaShoppingCart } from "react-icons/fa";

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

*/