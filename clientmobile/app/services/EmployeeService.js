import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:5000'

const EmployeeService = {
    getAll: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/Employee`);
            return response.data;
        } catch (error) {
            console.error('Error fetching employees:', error);
            throw error;
        }
    },

    getByPost: async (post) => {
        try {
            const response = await axios.get(`${BASE_URL}/Employee/post?post=${post}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching employees by post:', error);
            throw error;
        }
    },

    getByPeriod: async (days) => {
        try {
            const response = await axios.get(`${BASE_URL}/Employee/period?days=${days}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching employees by period:', error);
            throw error;
        }
    },

    create: async (employee) => {
        try {
            const response = await axios.post(`${BASE_URL}/Employee`, employee);
            return response.data;
        } catch (error) {
            console.error('Error creating employee:', error);
            throw error;
        }
    },

    update: async (employee) => {
        try {
            const response = await axios.put(`${BASE_URL}/Employee`, employee);
            return response.data;
        } catch (error) {
            console.error('Error updating employee:', error);
            throw error;
        }
    },

    delete: async (employee) => {
        try {
            const response = await axios.delete(`${BASE_URL}/Employee`, { data: employee });
            return response.data;
        } catch (error) {
            console.error('Error deleting employee:', error);
            throw error;
        }
    },
};

export default EmployeeService;