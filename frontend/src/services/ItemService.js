import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

// GET REQUEST
export const getItems = async () => {
    try {
        const response = await axios.get(API_URL);
        return response;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};

// POST REQUEST
export const createItem = async (name) => {
    try {
        const response = await axios.post(API_URL, { name });
        return response;
    } catch (error) {
        console.error('Error creating item:', error);
        throw error;
    }
};

// PUT REQUEST
export const updateItem = async (id, name) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { name });
        return response;
    } catch (error) {
        console.error('Error updating item:', error);
        throw error;
    }
};

// DELETE REQUEST
export const deleteItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response;
    } catch (error) {
        console.error('Error deleting item:', error);
        throw error;
    }
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

