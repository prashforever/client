import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const fetchCategories = async () => (await api.get("/categories")).data;
export const fetchProducts = async (params = {}) =>
  (await api.get("/products", { params })).data;
export const fetchProduct = async (id) => (await api.get(`/products/${id}`)).data;
export const fetchReviews = async () => (await api.get("/reviews")).data;
