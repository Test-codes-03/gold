//src/axios.js
import axios from "axios";

export const API = axios.create({
  baseURL:'https://gold-api-sw77.onrender.com/',
  withCredentials: true,
});
