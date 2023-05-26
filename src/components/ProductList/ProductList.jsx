import React, {useContext,useState} from 'react'
import DataContext from '../../context/DataContext';
import styles from "./styles.module.css";
import ProductCard from '../ProductCard/ProductCard';
import CategoryList from '../CategoryList/CategoryList';
import { FaSearch } from "react-icons/fa";


const ProductList = () => {
    const {produtos,categorias,produtosBackup,setProdutos} = useContext(DataContext);
    const [search, setSearch] = useState('');


    const onchangeInput = (event) => {
        setSearch(event.target.value);
        let novoArray = produtosBackup.filter(
          (produto) => produto.nome.toUpperCase().includes(event.target.value.toUpperCase()) || produto.descricao.toUpperCase().includes(event.target.value.toUpperCase()) )
        ;
        //if (!novoArray.length) setHasProdutos(null);
        setProdutos(novoArray);
      };

    const TituloCategoria = ({categoria}) => {

        const arr = produtos.filter(
          (produto) => produto.categoria_id === categoria.id
        );
       
        return arr.length ? (
          <h3 id={categoria.nome} className={styles.tituloCategoria} key={categoria.id}>
            {categoria.nome}
          </h3>
        ) : (
          ""
        );
      }





  return (
    <div className={styles.container}>
       <CategoryList categorias={categorias}/>
       <div className={styles.containerInput}>
          <input
            className={styles.inputPesquisa}
            placeholder="Pesquisar por produto ou ingrediente"
            type="text"
            onChange={onchangeInput}
            value={search}
          />
          <FaSearch  size={18} /> 
      </div>
        {categorias.map((categoria) => (
                <div  key={categoria.id}>
                <TituloCategoria categoria={categoria} key={categoria.id} />

                {produtos.filter(
                    (produto) => produto.categoria_id === categoria.id
                ).map((produto) => (
                    <ProductCard key={produto.id} produto={produto}/>
                ))}
                </div>
        ))}
      
       
    </div>
  )
}

export default ProductList