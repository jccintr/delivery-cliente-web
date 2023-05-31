import React from 'react';
import styles from "./styles.module.css";

const InputField = ({label,placeholder,value,setValue}) => {
  return (
    <div className={styles.container}>

       <span className={styles.label}>{label}</span>
       <div className={styles.inputContainer}>
            <input 
                    className={styles.input}
                    type="text"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e)=> setValue(e.target.value)}
              />
       </div>
       

    </div>
  )
}

export default InputField