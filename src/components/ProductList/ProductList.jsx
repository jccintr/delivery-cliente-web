import React, {useContext} from 'react'
import DataContext from '../../context/DataContext';
import styles from "./styles.module.css";
import ProductCard from '../ProductCard/ProductCard';




const ProductList = ({produtos}) => {
    
    const {categorias} = useContext(DataContext);
    
    const TituloCategoria = ({categoria}) => {

          const arr = produtos.filter(
            (produto) => produto.categoria_id === categoria.id
          );
          
          return arr.length ? <a className={styles.link} href="#topo"><h3 id={categoria.nome} className={styles.tituloCategoria} key={categoria.id}>{categoria.nome}</h3></a>:"";
}





  return (
    <div className={styles.container}>
       
       {produtos.length===0 ? <p className={styles.noRecords}>Produtos não encontrados.</p>:""}

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