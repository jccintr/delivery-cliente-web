import React, {useContext,useState,useEffect} from 'react'
import styles from "./styles.module.css";
import DataContext from '../../context/DataContext';
import SearchField from '../SearchField/SearchField';
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import PizzaList from '../PizzaList/PizzaList';
import data from '../../data/pizzas';

const Pizzas = () => {
  const {pizzas,setPizzas} = useContext(DataContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  //const [pizzas,setPizzas] = useState(data);
  //console.log(pizzas);

  const onClearClick = () => {
    setSearch('');
    setPizzas(data);
  }

  const onchangeInput = (event) => {
    setSearch(event.target.value);
    let novoArray = data.filter((produto) => produto.nome.toUpperCase().includes(event.target.value.toUpperCase()) || produto.descricao.toUpperCase().includes(event.target.value.toUpperCase()) );
    setPizzas(novoArray);
  };


  return (
    <main className={styles.container}>
      <MdClose onClick={()=>{navigate('/pizza');}} style={{position:'absolute',top:10,right:10}} size={22} />
      <div className={styles.titleContainer}>
              <div className={styles.title}>Selecione o sabor da pizza</div>
      </div>
      <div className={styles.spacer}/>
      <SearchField onChange={onchangeInput} search={search} onClearClick={onClearClick} placeholder='Pesquisar por pizza'/>
      <PizzaList pizzas={pizzas} />
    </main>
  )
}

export default Pizzas