import axios from "axios";

// PokeAPI Configuration
export const pokeApiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Backend API Configuration
export const backendApiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for debugging
if (import.meta.env.DEV) {
  pokeApiClient.interceptors.request.use((config) => {
    console.log("PokeAPI Request:", config.method?.toUpperCase(), config.url);
    return config;
  });

  backendApiClient.interceptors.request.use((config) => {
    console.log("Backend Request:", config.method?.toUpperCase(), config.url);
    return config;
  });
}

// Response interceptor for error handling
pokeApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("PokeAPI Error:", error.response?.status, error.message);
    return Promise.reject(error);
  },
);

backendApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Backend Error:", error.response?.status, error.message);
    return Promise.reject(error);
  },
);
