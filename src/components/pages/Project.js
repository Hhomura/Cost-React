import { parse, v4 as uuidv4 } from 'uuid';
import { useParams } from 'react-router-dom'
import styles from './Project.module.css'
import { useState, useEffect } from 'react';
import Loading from '../layouts/Loading';
import Container from '../layouts/Container';
import ProjectForm from '../project/projectForm';
import Message from '../layouts/Message'
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

export default (() =>{

    const {id} = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [services, setServices] = useState([]);
    const [showServiceForm, setShowServiceForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() =>{
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
            }
        }).then((resp) => resp.json()).then((data) =>{
            setProject(data)
            setServices(data.services);
        }).catch((err) => console.log("Erro: "+ err));
        }, 1000);
    }, [id])

    function editPost(project){
        setMessage('');
        //budget validation
        if(project.budget < project.cost){
             //message
             setMessage("O Orçamento não pode ser mmenor que oi custo")
             setType('error')
             return false
        }
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json()).then((data) =>{
            setProject(data);
            setShowProjectForm(false)
            setMessage("Projeto Atualizado")
             setType('success')
        })

    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm);
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm);
    }

    function removeService(id, cost){

        setMessage('');
        const serviceUpdate = project.services.filter((service) => service.id !== id);
        const projectUpdate = project;
        projectUpdate.services = serviceUpdate;
        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost);

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdate)})
        .then((resp) => resp.json())
        .then((data) =>{
            setProject(projectUpdate);
            setServices(serviceUpdate);
            setMessage("Serviço Apagado com Sucesso")
            setType("success");
        })
        .catch((err) => console.log(err))
    }
    
    function createService(project){
        setMessage('');
        const lastService = project.services[project.services.length -1]; 
        lastService.id = uuidv4();

        const lastServiceCost = lastService.cost;

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento Ultrapassado, verifique o valor do serviço");
            setType('error');
            project.services.pop()
            return false;
        }

        project.cost = newCost;

        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        }).then((resp) => resp.json())
        .then((data) =>{
            setShowServiceForm(false);
        })
        .catch((err) => console.log("Erro: " + err));

    }


    console.log(id);
    return(
        <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && (<Message type={type} message={message}/>)}
                    
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm? 'Editar Projeto': 'Fechar'}</button>
                        {!showProjectForm? (
                            <div className={styles.project_info}>
                                <p><span>Categoria:</span> {project.category.name}</p>
                                <p><span>Total do Orçamento:</span> R${project.budget}</p>
                                <p><span>Total Utilizado: </span>R${project.cost}</p>
                            </div>
                        ) : (
                            <div className={styles.project_info}>
                                <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project}/>
                            </div>
                        )}
                    </div>
                    <div className={styles.service_form_container}>
                        <h2>Adicione um Serviço</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm? 'Adicionar Serviço': 'Fechar'}</button>
                        <div className={styles.project_info}>
                            {showServiceForm &&(
                                <ServiceForm
                                handleSubmit={createService}
                                textBtn="Adicionar Serviço"
                                projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        {services.length > 0 && 
                        services.map((services) =>(
                            <ServiceCard
                            id={services.id}
                            name={services.name}
                            cost={services.cost}
                            description={services.description}
                            key={services.id}
                            handleRemove={removeService}
                            />
                        ))
                        }
                        {services.length == 0 && <p>Não há Servicços</p>}
                    </Container>
                </Container>
            </div>
        ):(
        <Loading/>
        )}
        </>
    )
})