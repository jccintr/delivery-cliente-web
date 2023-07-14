import React, {useContext} from 'react'
import styles from "./styles.module.css";
import DataContext from '../../context/DataContext';
import Api from '../../Api';
import Status from '../Status/Status';

const Header = () => {
  const {tenant} = useContext(DataContext);
  return (
    <header className={styles.container} style={{backgroundColor: tenant.cor_fundo}}>
        <img className={styles.logo} alt="logo" src={`${Api.base_storage}/${tenant.logotipo}`} />
        <span style={{color: tenant.cor_texto}}>{tenant.name}</span>
        <Status aberto={tenant.aberto}/>
        
    </header>
  )
}

export default Header