import axios from 'axios';
import {buildQueryString} from '../utils/buildQueryString'

export const fetchAllHolidays = async([query,token])=>{
  const allQueries = buildQueryString(query)
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/holiday/all-holidays/${allQueries}`, {
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
export const fetchHolidaysByEmployeeId = async([id,token])=>{
  console.log('prams from fetchHolidaysByEmployeeId',id,token)
  try {
    const response = await axios.get(`http://localhost:5001/api/v1/holiday/holiday-user/${id}`, {
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
export const UpdateHolidayRequest = async([data,token])=>{
  console.log('prams from UpdateHolidayRequest',data,token)
  try {
    const response = await axios.put(`http://localhost:5001/api/v1/holiday/holiday-responce`,{...data}, {
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
export const deleteHoliday = async([id,token])=>{
  console.log('prams from deleteHoliday',id,token)
  try {
    const response = await axios.delete(`http://localhost:5001/api/v1/holiday/holiday-user/delete/${id}`, {
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