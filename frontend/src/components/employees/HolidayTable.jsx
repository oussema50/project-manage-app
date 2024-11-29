import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import { getLocalStorage } from '../../utils/localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { load, stopLoad } from '../../redux/slices/loading';
import { getAllHolidays,removeHoliday } from '../../redux/slices/holidays';
import { showUpdateHolidayPopUp } from '../../redux/slices/popUp';
import UpdateHolidayFormPopUp from '../pop-up/UpdateHolidayPopUp'
export const HolidayTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [employeeId,setEmployeeId] = useState(null)
    const holidays = useSelector(state=>state.holidays.holidays)
    const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
    const loading = useSelector(state=>state.loading.loading)
    const updateHolidayPopUp = useSelector(state=>state.popUp.updateHolidayPopUp)
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
      dispatch(load())
      handleRequest([{page:currentPage},token])
      dispatch(stopLoad())
  
    
    },[currentPage,dispatch])
  
    const handleRequest = ([query,token])=>{
      
      dispatch(getAllHolidays([query,token]))
  
    }
    //update holiday satus
    const updateHoliday = (id)=>{
      // console.log('updateHoliday===========>>>>>',id)
      setEmployeeId(id)
      dispatch(showUpdateHolidayPopUp(true))
    }
    //deleteHoliday
    const deleteHolidayAction = (id)=>{
      dispatch(removeHoliday([id,token]))
      // dispatch(getAllHolidays([{},token]))
    }
    const converToStringDate = (date)=>{
        return new Date(date).toISOString().split("T")[0]
      }
    const handleNext = () => {
      if (currentPage < holidays.totalPages) setCurrentPage(currentPage + 1);
    };
  
    const handlePrevious = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    };
  
    return (
      <div className="container mx-auto my-8 p-4">
        <div className="overflow-x-auto shadow-md rounded-lg">
          {loading ? (
            <LoadingSpinner/>
          ) : (
            <>
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold text-gray-800">Holidays</h2>
                
              </div> 
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Holiday Id
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    employee Id
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    First Name
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Last Name
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    startDate
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                     endDate
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    status
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    holidayDays
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                     rejectionReason
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    actions
                  </th>
                </tr>
              </thead>
              <tbody>
              {holidays.holidayRequest &&
                holidays.holidayRequest.map((holiday, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
                  >
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.employeeId}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.User.firstName}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.User.lastName}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.User.email}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{converToStringDate(holiday.startDate)}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{converToStringDate(holiday.endDate)}</td>
                    <td
                      className={`py-4 px-6 text-sm text-gray-800 ${
                        holiday.status === 'accepted'
                          ? 'bg-green-500 text-white'
                          : holiday.status === 'rejected'
                          ? 'bg-red-500 text-white'
                          : 'bg-yellow-300 text-black'
                      }`}
                    >
                      {holiday.status}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.holidayDays}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.rejectionReason}</td>
                      
                    <td className="py-4 px-6 text-sm text-gray-800">
                      <button onClick={()=>updateHoliday(holiday.employeeId)} className="px-4 py-2 mb-4 mr-4 w-20 bg-blue-500 text-white text-sm font-medium rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition duration-200">
                        Update
                      </button>
                      <button onClick={()=>deleteHolidayAction(holiday.id)}  className="px-4 py-2 w-20  bg-red-500 text-white text-sm font-medium rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition duration-200">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </>
          )}
          <div className="flex justify-between items-center bg-gray-100 p-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Previous
            </button>
            <span className="text-sm font-medium text-gray-700">
              Page {currentPage} of {holidays.totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === holidays.totalPages}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                currentPage === holidays.totalPages
                  ? 'bg-gray-300'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
        <UpdateHolidayFormPopUp id={employeeId} />
      </div>
    );
}
