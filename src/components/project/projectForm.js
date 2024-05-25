import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/submitButton'
import styles from './projectForm.module.css'
import { useEffect, useState } from 'react'

export default (({btnText, handleSubmit, projectData}) => {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {})

    const  submit = (e) =>{
        e.preventDefault()
        console.log("Testes: " + JSON.stringify(project))
        handleSubmit(project);
    }

    function handleChange(e){
        setProject({...project,
            [e.target.name]: e.target.value})
        console.log(project)
    }
    function handleCategory(e){
        setProject({...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        },
    })
    }

    useEffect(() =>{
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => setCategories(data))
        .catch((err) => console.log("Erro: "+err));
    }, [])

    return (
        <form className={styles.form} onSubmit={submit}>
            <div><Input handleOnChange={handleChange} type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do Projeto" value={project.name}/></div>
            <div><Input handleOnChange={handleChange} type= "number" text="Orçamento do Projeto" name="budget" placeholder="Insira o orçamento total" value={project.budget? project.budget: ''}/></div>
            <div>
                <Select name="category_id" text="Selecione a Categoria" options={categories} handleOnChange={handleCategory} value={project.category? project.category.id: ''}/>
                <SubmitButton text = {btnText}/>
            </div>
        </form>
    )
})