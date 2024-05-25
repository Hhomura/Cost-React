import { useLocation } from "react-router-dom"
import Message from "../layouts/Message"
import styles from './Projects.module.css'
import Container from '../layouts/Container'
import LinkButton from '../layouts/Linkbutton'
import ProjectCard from "../project/ProjectCard"
import { useEffect, useState } from "react"
import Loading from "../layouts/Loading"


export default (() =>{

    const [projects, setProjects] = useState([]);
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState('');

    useEffect(() =>{
        setTimeout(() =>{
            fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) =>{
            console.log(data)
            setProjects(data)
            setRemoveLoading(true);
        })
        }, 500);
    }, [])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProjects(projects.filter((project) => project.id !== id))
            //message remoção
            setProjectMessage('projeto removido com sucesso');
        })
    }

    const location = useLocation();
    let message = "";
    if(location.state){
        message = location.state.message;
    }
    
    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" message={message}/>}
            {projectMessage && <Message type="success" message={projectMessage}/>}
            <Container customClass = "start">
                {projects.length > 0 && projects.map((project) =>(
                    <ProjectCard name={project.name}
                    id={project.id}
                    budget={project.budget}
                    key={project.id}
                    category={project.category.name}
                    handleRemove={removeProject}
                    />
                ))}
                {!removeLoading && (
                    <Loading/>
                )}
             {removeLoading && projects.length === 0 && (
                <p>Não há projetos Cadastrados</p>
             )}
            </Container>
        </div>
    )
})