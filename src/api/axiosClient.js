import axios from "axios";

const api = axios.create({
  baseURL: "https://69ba47aeb3dcf7e0b4bc6405.mockapi.io/api/thuctap/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
