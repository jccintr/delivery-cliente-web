import React from 'react'
import styles from "./styles.module.css";
import ProductList from '../ProductList/ProductList';

const Content = () => {
  return (
    <div className={styles.container}>
        <ProductList />
    </div>
  )
}

export default Content