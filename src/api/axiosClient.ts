import axios from 'axios'
export const apiClient=axios.create({
    // Will change it later to real backend URL
    // Maybe using with env file
    baseURL:import.meta.env.DEV?'http://localhost:3000':'',
    withCredentials:true
})