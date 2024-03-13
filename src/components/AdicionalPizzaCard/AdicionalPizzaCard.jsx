import React,{useContext} from 'react';
import styles from "./styles.module.css";
import { ImCheckboxUnchecked,ImCheckboxChecked } from "react-icons/im";
import DataContext from '../../context/DataContext';

const AdicionalPizzaCard = ({adicional,onChange,tamanhoPizza}) => {
   const {tenant} = useContext(DataContext);
  return (
     <div className={styles.container} onClick={()=>onChange(adicional.id)}>
        <div className={styles.checkContainer}>
           {adicional.selecionado?<ImCheckboxChecked size={18} color={tenant.cor_fundo}/>:<ImCheckboxUnchecked size={18} color={tenant.cor_fundo}/>}
           <span className={styles.nome}>{adicional.nome}</span>           
        </div>
        <p className={styles.valor}>R$ {tamanhoPizza===1?adicional.grande:adicional.broto}</p>
     </div>
  )
}

export default AdicionalPizzaCard
