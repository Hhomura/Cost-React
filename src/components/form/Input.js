import styles from './Input.module.css'

export default (({type, text, name, placeholder, handleOnChange, value}) =>{
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input name={name} type={type} placeholder={placeholder} onChange={handleOnChange} value={value}/>
        </div>
    )
})