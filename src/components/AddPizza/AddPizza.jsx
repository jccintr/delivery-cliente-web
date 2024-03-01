import React, { useState, useEffect,useContext} from 'react';
import styles from "./styles.module.css";
import { MdClose } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import Api from '../../Api';
import SelectFieldGenerico from '../SelectFieldGenerico/SelectFieldGenerico';
import AdicionalCard from '../AdicionalCard/AdicionalCard';
import DataContext from '../../context/DataContext';
import MessageBox from '../MessageBox/MessageBox';


const AddPizza = ({itensPedido,addItemPedido}) => {
  return (
    <div>AddPizza</div>
  )
}

export default AddPizza