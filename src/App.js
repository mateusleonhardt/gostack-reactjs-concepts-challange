import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    let repository = {
      title: `Second Chalange ${Date.now()}`,
      url: 'https://github.com',
      techs: ['ReactJS', 'Node.js']
    }

    const response = await api.post('repositories', repository);

    repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    let repositoriesList = repositories;
    repositoriesList.splice(repositoryIndex, 1);

    setRepositories([...repositoriesList]);
  }

  return (
    <div>
      <h1>Repositórios</h1>
        <ul data-testid="repository-list">
          {repositories.map(repository => (
              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            ))
          }
        </ul>

        <ul>
          {repositories.length > 0 
            ? null
            : <li>Não há repositórios</li>
          }
        </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}