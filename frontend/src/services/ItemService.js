import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

// GET REQUEST
export const getItems = () => {
    return axios.get(API_URL);
};

// POST REQUEST
export const createItem = (name) => {
    return axios.post(API_URL, { name });
};

// PUT REQUEST
export const updateItem = (id, name) => {
    return axios.put(`${API_URL}/${id}`, { name });
};

// DELETE REQUEST
export const deleteItem = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const getItemById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error('Error fetching item by id:', error);
        throw error;
    }
};

