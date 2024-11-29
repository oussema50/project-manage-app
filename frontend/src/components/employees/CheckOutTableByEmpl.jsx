import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import LoadingSpinner from '../LoadingSpinner';
import { getAllWorkingHour } from '../../redux/slices/workingHours';
import { getLocalStorage } from '../../utils/localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { load, stopLoad } from '../../redux/slices/loading';
export const CheckOutTableByEmpl = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const workingHours = useSelector(state=>state.workingHours.workingHours)
    const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
    const loading = useSelector(state=>state.loading.loading)
    const [currentPage, setCurrentPage] = useState(1);
    const [checkOut,setCheckOut] = useState([])
    const itemsPerPage = 5;
    const totalPages = Math.ceil(workingHours.length / itemsPerPage);
    const handleRowClick = (id) => {
      navigate(`/all-chekcout-hours/${id}`);
    };
    useEffect(()=>{
    const chekcOutFn = ()=>{
      workingHours.workingHours && workingHours.workingHours.map((workingHour, index) => {

     })
    }
  
    
    },[])
    
    function convertMilliseconds(ms) {
        const hours = Math.floor(ms / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        return { hours, minutes };
      }
    const handleRequest = ([query,token])=>{
      
      dispatch(getAllWorkingHour([query,token]))
  
    }
    const handleNext = () => {
      if (currentPage < workingHours.totalPages) setCurrentPage(currentPage + 1);
      // handleRequest([{page:currentPage},token])
    };
  
    const handlePrevious = () => {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
      // handleRequest([{page:currentPage},token])
    };
  
    return (
      <div className="container mx-auto my-8 p-4">
        <div className="overflow-x-auto shadow-md rounded-lg">
          {loading ? (
            <LoadingSpinner/>
          ) : (
            <>
              <div className="flex items-center justify-between p-4">
                <h2 className="text-lg font-semibold text-gray-800">Check-Out</h2>
                <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition duration-200">
                  Get All Check-Out
                </button>
              </div> 
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    employee Id
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    date
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  checkOutStatus
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  checkoutTime
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  hoursOfCheckOut
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  checkOutReason
                  </th>
                </tr>
              </thead>
              <tbody>
              {workingHours.workingHours &&
                workingHours.workingHours.map((workingHour, index) => {
                    const result = convertMilliseconds(workingHour.hoursOfCheckOut)
                    if(workingHour.checkOutStatus){
                        return (
                            <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
                    onClick={() => handleRowClick(workingHour.id)}
                  >
                    <td className="py-4 px-6 text-sm text-gray-800">{workingHour.id}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{workingHour.employeeId}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{workingHour.date}</td>
                    <td
                      className={`py-4 px-6 text-sm text-gray-800 ${
                        workingHour.checkOutStatus === 'accepted'
                          ? 'bg-green-500 text-white'
                          : workingHour.checkOutStatus === 'rejected'
                          ? 'bg-red-500 text-white'
                          : 'bg-yellow-300 text-black'
                      }`}
                    >
                      {workingHour.checkOutStatus}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-800">{workingHour.checkoutTime}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{`${result.hours} hours and ${result.minutes} minutes`}</td>
                    <td className="py-4 px-6 text-sm text-gray-800">{workingHour.checkOutReason}</td>
                  </tr>
                        )
                    }
                }
                    
                  
                )}
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
              Page {currentPage} of {workingHours.totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === workingHours.totalPages}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
                currentPage === workingHours.totalPages
                  ? 'bg-gray-300'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
}
