import React from 'react'
import styles from "./styles.module.css";



const CategoryList = ({categorias}) => {
    return (
      <div className={styles.scrollmenu}>

       {categorias.map((categoria) =><a id="topo" className={styles.categoryItem} key={categoria.id} href={'#'+categoria.nome}>{categoria.nome}</a>)}
    
    </div>
    )
  }



export default CategoryList