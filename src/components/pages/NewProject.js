import ProjectForm from '../project/projectForm'
import styles from './NewProject.module.css'
import {useNavigate} from 'react-router-dom'

export default (() =>{

    const history = useNavigate();

    function createPost(project){
        //initialize cost and services
        project.cost = 0;
        project.services = [];

        fetch("http://localhost:5000/projects", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            //redirect
            history('/projects', {state:{message: "Projeto Mandado com sucesso"}});
        }).catch((err) => console.log("Erro: "+err));

    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seus projetos para depois adicionar os Serviços</p>
            <ProjectForm handleSubmit={createPost} btnText = "Criar Projeto"/>
        </div>
    )
})