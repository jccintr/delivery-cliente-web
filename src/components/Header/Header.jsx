import React, {useContext} from 'react'
import styles from "./styles.module.css";
import DataContext from '../../context/DataContext';
import Api from '../../Api';
import Status from '../Status/Status';
import { FaClock,FaPhoneAlt } from "react-icons/fa";

const Header = () => {
  const {tenant,loadingPage} = useContext(DataContext);
  //console.log('loading='+loadingPage);

  const TempoEspera = () => {
    return (
        <div className={styles.containerInfo} style={{borderColor: tenant.cor_texto,}}>
            <FaClock size={14} color={tenant.cor_texto}/>
            <span className={styles.infoText} style={{marginLeft:5,borderColor: tenant.cor_texto,color: tenant.cor_texto}}>{tenant.tempo_espera}</span>
        </div>
      )
}

const Telefone = () => {
  return (
      <div className={styles.containerInfo} style={{borderColor: tenant.cor_texto,}}>
          <FaPhoneAlt size={14} color={tenant.cor_texto}/>
          <span className={styles.infoText} style={{marginLeft:5,borderColor: tenant.cor_texto,color: tenant.cor_texto}}>{tenant.telefone}</span>
      </div>
    )
}


  return (
    <>
      {!loadingPage&&<header className={styles.container} style={{backgroundColor: tenant.cor_fundo}}>
        {tenant.logotipo&&<img className={styles.logo} alt="logo" src={`${Api.base_storage}/${tenant.logotipo}`} />}
        <span style={{color: tenant.cor_texto}}>{tenant.name}</span>
        <div className={styles.infoLine}>
          <TempoEspera/>
          <Status aberto={tenant.aberto}/>
          <Telefone/>
        </div>
    </header>}
    </>
    
    
  )
}

export default Header