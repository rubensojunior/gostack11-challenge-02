import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [repository, setRepository] = useState({
    title: "",
    url: "",
    techs: ["d"],
  });

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  const handleChangeTitle = (event) => {
    setRepository({ ...repository, title: event.target.value });
  };

  const handleChangeUrl = (event) => {
    setRepository({ ...repository, url: event.target.value });
  };

  const handleChangeTechs = (event) => {
    setRepository({
      ...repository,
      techs: [event.target.value],
    });
  };

  async function handleAddRepository() {
    try {
      const response = await api.post("repositories", repository);
      setRepositories([...repositories, response.data]);
    } catch {
      alert("ocorreu um erro inesperado");
    }
  }

  async function handleRemoveRepository(id) {
    try {
      const response = await api.delete(`repositories/${id}`);
      const newRepos = repositories.filter((repo) => repo.id !== id);

      setRepositories(newRepos);
    } catch {
      alert("ocorreu um erro inesperado");
    }
  }

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Título"
          value={repository.title}
          onChange={handleChangeTitle}
        />
        <input
          type="text"
          placeholder="url"
          value={repository.url}
          onChange={handleChangeUrl}
        />
        <input
          type="text"
          placeholder="Tecnologia 1"
          value={repository.techs[0]}
          onChange={handleChangeTechs}
        />
        <button type="submit" onClick={handleAddRepository}>
          Adicionar
        </button>
      </form>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button
              type="button"
              onClick={() => handleRemoveRepository(repository.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
