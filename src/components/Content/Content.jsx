import React, {useContext,useState,useEffect} from 'react'
import styles from "./styles.module.css";
import ProductList from '../ProductList/ProductList';
import CategoryList from '../CategoryList/CategoryList';
import DataContext from '../../context/DataContext';
import SearchField from '../SearchField/SearchField';
import { useParams } from "react-router-dom";
import ReactLoading from 'react-loading';

const Content = () => {
  const {slug} = useParams();
  const {produtos,categorias,produtosBackup,setProdutos,setSlug,loadingPage} = useContext(DataContext);
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
    <>
    {!loadingPage?(
    <main className={styles.container}>
        <CategoryList categorias={categorias}/>
        <SearchField onChange={onchangeInput} search={search} onClearClick={onClearClick}/>
        <ProductList produtos={produtos}/>
    </main>):(<main className={styles.loading}>
      <ReactLoading  type="spin" color="#C0C0C0" height={150} width={150} />
      <span className={styles.loadingMessage}>Carregando Cardápio...</span>
    </main>
      
    )}
    </>
  )
}

export default Content