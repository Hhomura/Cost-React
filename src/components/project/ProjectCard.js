import { Link } from 'react-router-dom'
import Linkbutton from '../layouts/Linkbutton'
import styles from './ProjectCard.module.css'
import {BsFillTrash2Fill, BsPencil, bsFillTrashFill} from 'react-icons/bs'

export default (({id, name, budget, category, handleRemove}) =>{

    function remove (e){
        e.preventDefault();
        handleRemove(id);
    }

    return(
        <div className={styles.project_card}>
            <h4>
                {name}
            </h4>
            <p>
                <span>
                    Orçamento:
                </span> R${budget}
            </p>
            <p className={styles.category_text}>
                <span className={`${styles[category.toLowerCase()]}`}></span> {category}
            </p>
            <div className={styles.project_card_actions}>

                <Link to= {`/project/${id}`}>
                     <BsPencil/> Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrash2Fill/> Excluir
                </button>
            </div>
        </div>
    )
})