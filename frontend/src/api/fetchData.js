import axios from 'axios';
import axiosInstance from '../utils/axios'
import {buildQueryString} from '../utils/buildQueryString'

export const fetchAllEmployees = async([query,token])=>{
 
  const allQueries = buildQueryString(query)
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/users/${allQueries}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
        console.log('Data fetched successfully:', response.data);
        return response.data;  
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
        return null; 
      }
}

export const fetchEmployeeById = async([id,token])=>{
  
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/users/employee/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
        console.log('Data fetched successfully:', response.data);
        return response.data;  
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
        return null; 
      }
}