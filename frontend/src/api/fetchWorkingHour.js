import axios from 'axios';
import {buildQueryString} from '../utils/buildQueryString'
export const fetchWorkingHours = async([query,token])=>{
   
      const allQueries = buildQueryString(query)
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/working-hour/all-working-hours/${allQueries}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 
        console.log('Data fetched successfully from workingHour:', response.data);
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
export const fetchWorkingHoursByEmployee = async([id,query,token])=>{
  console.log("fetchWorkingHoursByEmployee ============>>>>>>>>",id,query,token)
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/working-hour/all-working-hours/${id}?page=${query.page}`, {
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

export const checkIn = async([id,token])=>{
  try {
    const response = await axios.post(`http://localhost:5001/api/v1/working-hour/checkIn/${id}`, {
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

export const UpdateWorkingHourRequest = async([data,token])=>{
  console.log('prams from UpdateHolidayRequest',data,token)
  try {
    const response = await axios.put(`http://localhost:5001/api/v1/working-hour/update-status`,{...data}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      
      console.log('Data updated successfully:', response.data);
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
export const updateCheckOutRequest = async([data,token])=>{
  console.log('prams from updateCheckOutRequest',data,token)
  try {
    const response = await axios.put(`http://localhost:5001/api/v1/working-hour/update-check-out-request`,{...data}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      
      console.log('Data updated successfully:', response.data);
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