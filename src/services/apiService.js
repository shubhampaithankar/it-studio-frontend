import axios from "axios";

const API_URL = 'https://it-studio-backend-kgev.onrender.com/'

axios.defaults.headers.common['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

export const getAllData = async () => (await axios.get(API_URL + 'data/get-all'))

export const createData = async (data) => (await axios.post(API_URL + 'data/create', data))

export const updateData = async (id, data) => (await axios.post(API_URL + 'data/update', { id, data }))

export const deleteData = async (id) => (await axios.post(API_URL + 'data/create', { id }))

export const sendEmail = async (data) => (await axios.post(API_URL + 'email/send', data))