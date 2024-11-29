import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {getEmployeeById} from '../redux/slices/employees'
import { getLocalStorage } from '../utils/localStorage';
import LoadingSpinner from '../components/LoadingSpinner';
import { load,stopLoad } from '../redux/slices/loading';
import {showPopUp,hiddenPopUp, showCheckOutPopUp} from '../redux/slices/popUp'
import { useDispatch, useSelector } from 'react-redux'
import HolidayPopupForm from '../components/pop-up/holidayPopUp';
import { getholidaysByEmployee } from '../redux/slices/holidays';
import io from 'socket.io-client';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getAllWorkingHour, getWorkingHoursByEmployee } from '../redux/slices/workingHours';
import CheckOutFormPopUp from '../components/pop-up/CheckOutForm';
import { HolidayTableByEmployee } from '../components/employees/HolidayTableByEmployee';
import { WorkingHoursByEmployee } from '../components/employees/WorkingHoursByEmployee';

// const socket = io('http://localhost:5001');

export const DashbordEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
  const loading = useSelector(state=>state.loading.loading)
  const holidaysByEmployee = useSelector(state=>state.holidays.holidaysByEmployee)
  const workingHours = useSelector(state=>state.workingHours.workingHoursByEmployee)
console.log('workingHours===========>>>>',workingHours)
  const notifications = useSelector(state=>state.notification.notifications)
  useEffect(()=>{
    dispatch(load())
    dispatch(getEmployeeById([id,token]))
    dispatch(getholidaysByEmployee([id,token]))
    dispatch(getWorkingHoursByEmployee([id,{page:1},token]))
    dispatch(stopLoad())
    // socket.emit("connected", id);

    // // Listen for notifications
    // socket.on("notification", (data) => {
    //     alert(`Notification: ${data.message}`);
    // });

    // return () => {
    //   socket.disconnect();
    // }
  },[])

  useEffect(()=>{
    
  
  },[])
  const checkInEmployee = async()=>{
    console.log(id,token)
    try{
      const response = await axios.get(`http://localhost:5001/api/v1/working-hour/checkIn/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getWorkingHoursByEmployee([id,{page:1},token]))
      dispatch(getAllWorkingHour([{},token]))
      Swal.fire({
        title: "",
        text: response.data.msg,
        icon: "success"
      }); 
    }catch(error){
      Swal.fire({
        title: "",
        text: error.response.data.message,
        icon: "error"
      }); 
      console.log(error.response.data.message)
    }
  }
  const showPopUpHoliday = ()=>{
    dispatch(showPopUp())
  }
  const showCheckOutFormPopUp = ()=>{
    dispatch(showCheckOutPopUp())
  }
  return (
    <div className="dashbord">
      <div className='bg-gray-100 min-h-screen p-6'>
        <div className="max-w-7xl mx-auto">
          {loading?<LoadingSpinner/>:
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700">Holiday days</h3>
            <h5 className="text-4xl font-bold text-indigo-600"> {holidaysByEmployee.length?holidaysByEmployee[0].holidayDays:21} </h5>
            <div className="pt-4 text-sm text-gray-800 flex space-x-2">
              <button onClick={showPopUpHoliday} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              holiday request
              </button>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700">working Hours </h3>
            {/* <h5 className="text-4xl font-bold text-yellow-600">5</h5> */}
            <div className="pt-4 text-sm text-gray-800 flex space-x-2">
              <button onClick={()=>checkInEmployee()} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                check-in
              </button>
              
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-gray-700">Checked-Out</h3>
            <button onClick={()=>showCheckOutFormPopUp()} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              check-out request
            </button>
          </div>
        </div>
          }
          
        </div>
        <HolidayTableByEmployee holidaysByEmployee={holidaysByEmployee} id={id} />
        <WorkingHoursByEmployee workingHours={workingHours} />
        {/* <PaginatedTable /> */}
        <HolidayPopupForm />
        <CheckOutFormPopUp id={id} />
      </div>
    </div>
  )
}
