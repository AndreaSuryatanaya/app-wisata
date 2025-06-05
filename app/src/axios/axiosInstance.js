import axios from "axios";

const instanceAxios = axios.create({
    baseURL: "https://project-tempest-hiring.up.railway.app",
});

export default instanceAxios;
