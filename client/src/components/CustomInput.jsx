import React from 'react'
import styles from '../styles'
const regularExpression = /^[A-Za-z0-9]+$/; //only accept charchter and number
const CustomInput = ({ label, placeHolder, value, handleValueChange }) => {
    return (
        <>
            <label htmlFor="name" className={styles.label}>{label}</label>
            <input
                type="text"
                placeholder={placeHolder}
                value={value}
                onChange={(e) => {
                    if (e.target.value === '' || regularExpression.test(e.target.value)) handleValueChange(e.target.value);
                }}
                className={styles.input}
            />
        </> 
    )
}

export default CustomInput