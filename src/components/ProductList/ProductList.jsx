import React, {useContext} from 'react'
import DataContext from '../../context/DataContext';
import styles from "./styles.module.css";
import ProductCard from '../ProductCard/ProductCard';
//import CategoryList from '../CategoryList/CategoryList';



const ProductList = ({produtos}) => {
    
    const {categorias,produtosBackup,setProdutos} = useContext(DataContext);
    


    

    const TituloCategoria = ({categoria}) => {

          const arr = produtos.filter(
            (produto) => produto.categoria_id === categoria.id
          );
          
          
        
          return arr.length ? <h3 id={categoria.nome} className={styles.tituloCategoria} key={categoria.id}>{categoria.nome}</h3>:"";

      }





  return (
    <div className={styles.container}>
       
       {produtos.length===0 ? <p className={styles.noRecords}>Nenhum item encontrado</p>:""}

        {categorias.map((categoria) => (
                <div  key={categoria.id}>
                    <TituloCategoria categoria={categoria} key={categoria.id} />
                     <div className={styles.items}>
                        {produtos.filter(
                            (produto) => produto.categoria_id === categoria.id
                        ).map((produto) => (
                            <ProductCard key={produto.id} produto={produto}/>
                        ))}
                        
                     </div>
                    
                </div>
        ))}
      
       
    </div>
  )
}

export default ProductList