import axios from "axios";
import { getLocalStorage } from "./localStorage";
import { useSelector } from "react-redux";
const token = getLocalStorage('token')
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5001/api/v1',  // Replace with your API base URL
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  
  export default axiosInstance;