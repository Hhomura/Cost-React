import styles from './Loading.module.css'
import loading from '../../img/loading.svg'

export default(() =>{
    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading}/>
        </div>
    )
})