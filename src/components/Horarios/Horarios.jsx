import React, {useContext} from 'react';
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import DataContext from '../../context/DataContext';
import { useNavigate } from "react-router-dom";


const Horarios = () => {
    const {horarios,slug} = useContext(DataContext);
    const navigate = useNavigate();

    const HorarioCard = ({horario}) => {
        const days = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
        return (
            <div className={styles.horarioCard}>
                <span style={{color:new Date().getDay()===horario.dia?'red':'',fontWeight:new Date().getDay()===horario.dia?'bold':''}}>{days[horario.dia]}</span>
                <span style={{color:new Date().getDay()===horario.dia?'red':'',fontWeight:new Date().getDay()===horario.dia?'bold':''}}>{horario.horario}</span>
            </div>
        )
    }

  return (
    <main className={styles.container}>
        <MdClose onClick={()=>{navigate(`/${slug}`);}} style={{position:'absolute',top:10,right:10}} size={22} />
        <div className={styles.body}>
             <div className={styles.linhaNome}>
                <div className={styles.nome}>Horário de Atendimento</div>
             </div>
             <div style={{marginTop:50}}>
               {horarios.map(horario=><HorarioCard key={horario.id} horario={horario}/>)}
             </div>
        </div>
    </main>
  )
}

export default Horarios