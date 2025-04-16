//src/axios.js
import axios from "axios";

export const API = axios.create({
  baseURL:'https://gold-backend-gmk0.onrender.com',
  withCredentials: true,
});
