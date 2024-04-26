import axios from 'axios';

// const API = axios.create({baseURL: 'https://password.one.trans-service-1.com.ua/api'});
const API = axios.create({baseURL: 'http://10.50.55.71:8088/api'});
// const API = axios.create({baseURL: 'http://localhost:8088/api'});


export const loginUser = (data) => API.post(`/auth`, data);

export const checkCode = (data) => API.post(`/auth/check`, data);

export const getProfile = async (token) => API.post(`/auth/profile`, token);

export const getMapsLevel1 = async (data) => API.post(`/maps/level1`, data);

export const getMapsById = async (data) => API.post(`/maps`, data);

export const getCurrentMap = async (data) => API.post(`/map`, data);

export const saveCurrentMap = async (data) => API.post(`/map/save`, data);

export const getProblemsByMap = async (data) => API.post(`/problems`, data);

export const createProblem = async (data) => API.post(`/problem/create`, data);

export const updateProblem = async (data) => API.post(`/problem/update`, data);

export const addWorker = async (data) => API.post(`/problem/worker`, data);


