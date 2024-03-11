import React from 'react'
import styles from "./styles.module.css";
import { FaSearch } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const SearchField = ({onChange,search,onClearClick,placeholder}) => {
  return (
    <div className={styles.container}>
          <FaSearch  size={18} /> 
          <input
            className={styles.input}
            placeholder={placeholder}
            type="text"
            onChange={onChange}
            value={search}
          />
          {search.length>0&&<MdClose  onClick={onClearClick} size={18} />}
      </div>
  )
}

export default SearchField