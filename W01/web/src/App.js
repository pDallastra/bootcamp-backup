import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css'

import backgroundImg from './assets/test.jpeg';

import { Header } from './components/Header';

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, [])

    async function handleAddProject() {
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
        const response = await api.post('projects', {title: `Novo Projeto ${Date.now()}`, ownder: "Paulo Dallastra"})
        const project = response.data;

        setProjects([...projects, project])
    }
    return(
        <>
            <Header title="ReactJS">
                <ul>
                    <li>Homepage</li>
                    <li>Projects</li>
                </ul>
            </Header>
            <Header title="Angular"/>

            {/* <img src={backgroundImg} alt="background" width={300}/> */}
            <ul>
                {projects.map(project => <li key={project.id} >{project.title}</li>)}
            </ul>

            <button type="button" onClick={handleAddProject}>Adicionar project</button>
        </>

    )
}

export default App;