import React, {useContext} from 'react';
import styles from "./styles.module.css";
import DataContext from '../../context/DataContext';

const Status = ({aberto}) => {
    const {tenant} = useContext(DataContext);
    return (
        <div className={styles.container} style={{borderColor: tenant.cor_texto,}}>
            <span style={{color: tenant.cor_texto,fontSize:12}}>{aberto?' ABERTO ':' FECHADO '}</span>
        </div>
      )
}

export default Status


/*
const Status = ({aberto}) => {
    return (
        <div className={styles.container}>
            <span className={aberto?styles.aberto:styles.fechado}>{aberto?'ABERTO':'FECHADO'}</span>
        </div>
      )
}
*/