const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  if ([title, url, techs].some(prop => !Boolean(prop))) {
    return response
    .status(400)
    .json({ message: "invalid payload." });
  }

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repo);

  return response
    .header({ "location": "http://localhost:3333/repositories" })
    .status(201)
    .json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  let repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response
    .status(400)
    .json({ message: "repository not found." })
  }

  const { title, url, techs } = request.body;
  repository = { ...repository, title, url, techs };

  const index = repositories.findIndex(repository => repository.id === id);

  repositories[index] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  let repository = repositories.findIndex(repository => repository.id === id);

  if (repository < 1) {
    return response
    .status(400)
    .json({ message: "repository not found." })
  }

  repositories.splice(repository, 1);

  return response
    .status(204)
    .send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  let repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response
    .status(400)
    .json({ message: "repository not found." })
  }

  repository.likes++;

  const index = repositories.findIndex(repository => repository.id === id);

  repositories[index] = repository;

  return response.json({ likes: repository.likes });
});

module.exports = app;
