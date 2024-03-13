import React from 'react'
import styles from "./styles.module.css";
import PizzaCard from '../PizzaCard/PizzaCard';
import { useLocation } from 'react-router-dom';

const PizzaList = ({pizzas}) => {
  const params = useLocation();
  const {sabor} = params.state;

  return (
    <div className={styles.container}>
       <div className={styles.items}>
         {pizzas.map((pizza)=>(<PizzaCard key={pizza.id} pizza={pizza} sabor={sabor}/>))}
       </div>
    </div>
  )
}

export default PizzaList