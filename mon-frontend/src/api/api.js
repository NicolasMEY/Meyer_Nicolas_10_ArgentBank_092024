// Configuration pour configurer Axios avec l'URL de base de l'API.

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export default api;
