import React from 'react';
import styles from "./styles.module.css";

const Status = ({aberto}) => {
    return (
        <div className={styles.container}>
            <span className={aberto?styles.aberto:styles.fechado}>{aberto?'ABERTO':'FECHADO'}</span>
        </div>
      )
}

export default Status