import api from "../configs/api";

const addCategory = (data) => api.post("category", data);
const getCategory = () => api.post("category");
export { addCategory, getCategory };
