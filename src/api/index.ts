import axios from "axios";
import auth from "#app/api/auth";
import protectedApi from "#app/api/protectedApi";

export const axiosInstance = axios.create({
    baseURL: '',
});

const api = {
    auth,
    protected: protectedApi,
}

export default api;
