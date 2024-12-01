import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import { getLocalStorage } from '../../utils/localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { load, stopLoad } from '../../redux/slices/loading';
import {getholidaysByEmployee } from '../../redux/slices/holidays';
import UpdateHolidayFormPopUp from '../pop-up/UpdateHolidayPopUp'
export const HolidayTableByEmployee = ({holidaysByEmployee,id}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
    const user = useSelector(state=>state.userAuth.user)
    const loading = useSelector(state=>state.loading.loading)
    // const [currentPage, setCurrentPage] = useState(1);
    // useEffect(()=>{
    //   dispatch(load())
    //   handleRequest([user.id,{page:currentPage},token])
    //   dispatch(stopLoad())
  
    
    // },[])

    // const handleRequest = ([id,query,token])=>{
      
    //   dispatch(getholidaysByEmployee([id,query,token]))
  
    // }
   
    const converToStringDate = (date)=>{
        return new Date(date).toISOString().split("T")[0]
      }
   
  
    return (
      <div className="container mx-auto my-8 p-4">
        <div className="overflow-x-auto shadow-md rounded-lg">
          {loading ? (
            <LoadingSpinner/>
          ) : (
            <>
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold text-gray-800">Your Holidays</h2>
                
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
              
                </tr>
              </thead>
              <tbody>
              {holidaysByEmployee &&
                holidaysByEmployee.map((holiday, index) => (
                  <tr
                  key={index}
                  className={`border-b border-white ${
                    holiday.status=== 'accepted'
                      ? 'bg-green-200 hover:bg-green-400'
                      : holiday.status=== 'rejected'
                      ? 'bg-red-200 hover:bg-red-400'
                      : holiday.status=== 'pending'
                      ? 'bg-yellow-200 hover:bg-yellow-300'
                      : ""
                  }  transition-colors duration-200 cursor-pointer`}
                  >
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.employeeId}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{converToStringDate(holiday.startDate)}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{converToStringDate(holiday.endDate)}</td>
                    <td
                      className={`py-4 px-6 text-sm text-gray-800`}
                    >
                      {holiday.status}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.holidayDays}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{holiday.rejectionReason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </>
          )}
          
        </div>
      </div>
    );
}
