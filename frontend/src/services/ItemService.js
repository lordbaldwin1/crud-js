import axios from 'axios';

const API_URL = '/api/items';

export const getItems = () => {
    return axios.get(API_URL);
};

export const createItem = (name) => {
    return axios.post(API_URL, { name });
};

export const updateItem = (id, name) => {
    return axios.put(`${API_URL}/${id}`, { name });
};

export const deleteItem = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

