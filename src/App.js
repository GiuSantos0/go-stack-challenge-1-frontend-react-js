import React, { useState, useEffect } from "react";
import api from "services/api";

import "./styles.css";

function App() {
  const [repositoryList, setRepositoryList] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositoryList(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Front end com React",
      url: "localhost",
      techs: [
        "React Js",
        "Material"
      ]
    })

    const repository = response.data;

    setRepositoryList([...repositoryList, repository])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    var repo = repositoryList.filter((r) => r.id !== id);

    for(var elemento of repo){
      var index = repositoryList.indexOf(elemento);    
      repositoryList.splice(index, 1);
    }

    setRepositoryList(repo)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositoryList.map(repository =>
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
