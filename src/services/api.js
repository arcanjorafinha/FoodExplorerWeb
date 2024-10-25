import axios from "axios";

export const api = axios.create({
    baseURL: "https://api-w42y.onrender.com"
});