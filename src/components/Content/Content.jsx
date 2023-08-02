import React, {useContext,useState,useEffect} from 'react'
import styles from "./styles.module.css";
import ProductList from '../ProductList/ProductList';
import CategoryList from '../CategoryList/CategoryList';
import DataContext from '../../context/DataContext';
import SearchField from '../SearchField/SearchField';
import { useParams } from "react-router-dom";

const Content = () => {
  const {slug} = useParams();
  const {produtos,categorias,produtosBackup,setProdutos,setSlug} = useContext(DataContext);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSlug(slug);
  }, []);


  const onClearClick = () => {
    setSearch('');
    setProdutos(produtosBackup);
  }


  const onchangeInput = (event) => {
    setSearch(event.target.value);
    let novoArray = produtosBackup.filter((produto) => produto.nome.toUpperCase().includes(event.target.value.toUpperCase()) || produto.descricao.toUpperCase().includes(event.target.value.toUpperCase()) );
    setProdutos(novoArray);
  };


  return (
    <main className={styles.container}>
        <CategoryList categorias={categorias}/>
        <SearchField onChange={onchangeInput} search={search} onClearClick={onClearClick}/>
        <ProductList produtos={produtos}/>
    </main>
  )
}

export default Content