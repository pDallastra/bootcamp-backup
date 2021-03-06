import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

// NAO POSSUI VALOR SEMÂNTICO
// NAO POSSUI ESTILIZACAO PROPRIA
// TODOS OS COMPONENTES POSSUEM POR PADRAO "DISPLAY FLEX"

// View: DIV, FOOTER, HEADER, MAIN, ASIDE, SECTION
// Text: P, SPAN, STRONG, H1, H2, H3


export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, [])

    async function handleAddPrject() {
        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            name: 'Paulo Dallastra'
        })

        const project = response.data;
        setProjects([...projects, project]);
    }

    return (
    <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>       
        <SafeAreaView style={styles.container}>
        <FlatList 
            data={projects}
            keyExtractor={project => project.id}
            renderItem={({ item }) => (
                <Text style={styles.project}>{item.title}</Text>
            )}
        />

        <TouchableOpacity activeOpacity={0.6} style={styles.button} onPress={handleAddPrject}>
            <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
        </SafeAreaView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#FFF',
        fontSize: 30
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
})