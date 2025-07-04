
import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

export const plantService = {
 
    getAllPlants: async (params = {}) => {
        try {
            const response = await axios.get(`${baseURL}/plant`, { params });
            return response.data;
        } catch (error) {
            console.error('Error fetching all plants:', error);
            throw error;
        }
    },
    getPlantById: async (id) => {
        try {
            const response = await axios.get(`${baseURL}/plant/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching plant with ID ${id}:`, error);
            throw error;
        }
    },
    createPlant: async (plantData) => {
        try {
            const response = await axios.post(`${baseURL}/plant`, plantData);
            return response.data;
        } catch (error) {
            console.error('Error creating plant:', error);
            throw error;
        }
    },
    updatePlant: async (id, plantData) => {
        try {
            const response = await axios.put(`${baseURL}/plant/${id}`, plantData);
            return response.data;
        } catch (error) {
            console.error(`Error updating plant with ID ${id}:`, error);
            throw error;
        }
    },
    deletePlant: async (id) => {
        try {
            const response = await axios.delete(`${baseURL}/plant/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting plant with ID ${id}:`, error);
            throw error;
        }
    },
};

