import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {

  const [repos, setRepos] = useState([])

  useEffect(() => { getAllRepos() }, []);

  async function getAllRepos() {
    const { data: repos } = await api.get("repositories");
    setRepos(repos);
  }

  async function handleAddRepository() {
    const { data: repo } = await api.post("repositories", {
      title: `fake title ${Date.now()}`,
      url: "fake url",
      techs: [
        "fake tech 1",
        "fake tech 2"
      ]
    })

    setRepos([...repos, repo]);
  }

  async function handleRemoveRepository(id) {
    console.count(id);
    await api.delete(`repositories/${id}`);
    setRepos(repos.filter(repo => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(({ id, title }) => {
          return (
            <li key={id}>
              
              { title }

              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
