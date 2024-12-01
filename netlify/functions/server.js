const express = require("express");
const app = express();
const PORT = 3000;

// Middleware pour gérer JSON
app.use(express.json());

// Simule une base de données en mémoire
let resources = [
  { id: 1, name: "Resource 1", description: "Description of resource 1" },
  { id: 2, name: "Resource 2", description: "Description of resource 2" },
];

// Routes de base
// Récupérer toutes les ressources
app.get("/api/resources", (req, res) => {
  res.json(resources);
});

// Récupérer une ressource par ID
app.get("/api/resources/:id", (req, res) => {
  const resource = resources.find((r) => r.id === parseInt(req.params.id));
  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }
  res.json(resource);
});

// Créer une nouvelle ressource
app.post("/api/resources", (req, res) => {
  const { name, description } = req.body;
  const newResource = {
    id: resources.length + 1,
    name,
    description,
  };
  resources.push(newResource);
  res.status(201).json(newResource);
});

// Mettre à jour une ressource existante
app.put("/api/resources/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const resource = resources.find((r) => r.id === parseInt(id));
  if (!resource) {
    return res.status(404).json({ message: "Resource not found" });
  }

  resource.name = name || resource.name;
  resource.description = description || resource.description;

  res.json(resource);
});

// Supprimer une ressource
app.delete("/api/resources/:id", (req, res) => {
  const { id } = req.params;
  const index = resources.findIndex((r) => r.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Resource not found" });
  }

  resources.splice(index, 1);
  res.status(204).send();
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
