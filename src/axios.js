//src/axios.js
import axios from "axios";

export const API = axios.create({
  baseURL:'https://jwlbackend-praveen.onrender.com',
  withCredentials: true,
});
