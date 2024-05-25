import styles from './Home.module.css'
import savings from '../../img/savings.svg'
import Linkbutton from '../layouts/Linkbutton'

export default (() =>{
    return(
            <section className={styles.home_container}>
                <h1>Bem Vindo ao <span>Costs</span></h1>
                <p>Comece a gerenciar seus projetos agora mesmo!</p>
               <Linkbutton to = "/newproject" text="Criar Projeto"/>
                <img src={savings} alt='Costs'/>
            </section>
    )
})