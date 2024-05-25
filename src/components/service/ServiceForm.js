import Input from '../form/Input'
import submitButton from '../form/submitButton'
import { useState } from 'react'
import styles from '../project/projectForm.module.css'
import SubmitButton from '../form/submitButton'

export default (({handleSubmit, textBtn, projectData}) => {

    const [service, setService] = useState([]);
    function submit(e) {
        e.preventDefault();
        projectData.services.push(service);
        handleSubmit(projectData);

    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }
    

    return (
        <>
            <form onSubmit={submit} className={styles
                .form}>
                <Input 
                type="text" 
                text="Nome do Serviço" 
                name="name" 
                placeholder="Insira o nome do Serviço"
                handleOnChange={handleChange} />

                <Input 
                type="number" 
                text="Custo do Serviço" 
                name="cost" 
                placeholder="Insira o valor total"
                handleOnChange={handleChange} />

                <Input 
                type="text" 
                text="Descrição do Serviço" 
                name="description" 
                placeholder="Descreva o Serviço"
                handleOnChange={handleChange} />

                <SubmitButton text = {textBtn}/>
            </form>
        </>
    )
})