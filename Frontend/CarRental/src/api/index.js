import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080'; // Adjust the base URL as needed

// Test API
export const testBackend = async () => {
    return await axios.get(`${API_BASE_URL}/test`);
};

// Admin APIs
export const createAdmin = async (adminData) => {
    return await axios.post(`${API_BASE_URL}/admin/add`, adminData);
};

export const adminLogin = async (adminData) => {
    return await axios.post(`${API_BASE_URL}/admin/login`, adminData);
};

export const fetchAllAdmins = async () => {
    return await axios.get(`${API_BASE_URL}/admin/alladmins`);
};

// Company APIs
export const addCompany = async (companyData) => {
    return await axios.post(`${API_BASE_URL}/admin/addcompany`, companyData);
};

export const fetchAllCompanies = async () => {
    return await axios.get(`${API_BASE_URL}/admin/allcompanies`);
};

// Car Variant APIs
export const addCarVariant = async (carVariantData) => {
    return await axios.post(`${API_BASE_URL}/admin/addvarient`, carVariantData);
};

export const fetchAllCarVariants = async () => {
    return await axios.get(`${API_BASE_URL}/admin/allvarient`);
}; 

// Customer APIs
export const registerCustomer = async (customerData) => {
    return await axios.post(`${API_BASE_URL}/customersignup`, customerData);
};

export const customerLogin = async (customerData) => {
    return await axios.post(`${API_BASE_URL}/customer/login`, customerData);
};

// Booking APIs
export const bookCar = async (bookingData) => {
    return await axios.post(`${API_BASE_URL}/car/book`, bookingData);
};

// Car APIs
export const fetchCars = async () => {
    const response = await axios.get(`${API_BASE_URL}/admin/allvarient`);
    return response.data;
};