import axios from 'axios';
export const checkOutRequest = async([id,data,token])=>{
   
    try {
      const response = await axios.put(`http://localhost:5001/api/v1/working-hour/checkOut-request/${id}`,data, {
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