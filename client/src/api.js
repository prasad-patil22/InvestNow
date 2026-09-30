const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:7000").replace(/\/+$/, "");

export const apiUrl = (path) => `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;