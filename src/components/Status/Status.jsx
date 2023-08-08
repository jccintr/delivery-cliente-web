import React, {useContext} from 'react';
import styles from "./styles.module.css";
import DataContext from '../../context/DataContext';
import { useNavigate } from "react-router-dom";

const Status = ({aberto}) => {
    const navigate = useNavigate();
    const {tenant} = useContext(DataContext);
    return (
        <div  onClick={()=>navigate('/horarios')} className={styles.container} style={{borderColor: tenant.cor_texto,}}>
            <span style={{color: tenant.cor_texto,fontSize:12}}>{aberto?' ABERTO ':' FECHADO '}</span>
        </div>
      )
}

export default Status
