import React, {useContext} from 'react'
import styles from "./styles.module.css";
import DataContext from '../../context/DataContext';
import Api from '../../Api';
import Status from '../Status/Status';

const Header = () => {
  const {tenant} = useContext(DataContext);
  return (
    <header className={styles.container}>
        <img className={styles.logo} alt="logo" src={`${Api.base_storage}/${tenant.logotipo}`} />
        <span>{tenant.name}</span>
        <Status aberto={tenant.aberto}/>
        
    </header>
  )
}

export default Header