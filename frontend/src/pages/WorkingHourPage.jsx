import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import LoadingSpinner from '../components/LoadingSpinner';
import { getAllWorkingHour } from '../redux/slices/workingHours';
import { getLocalStorage } from '../utils/localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { load, stopLoad } from '../redux/slices/loading';
export const WorkingHourPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const workingHours = useSelector(state=>state.workingHours.workingHours)
    const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
    const loading = useSelector(state=>state.loading.loading)
    const [currentPage, setCurrentPage] = useState(1);
    const handleRowClick = (id) => {
      navigate(`/all-working-hours/${id}`);
    };
    useEffect(()=>{
      dispatch(load())
      handleRequest([{page:currentPage},token])
      dispatch(stopLoad())
  
    
    },[currentPage])
   
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
        <div className=" shadow-md rounded-lg">
          {loading ? (
            <LoadingSpinner/>
          ) : (
            <>
             
            <h2 className="text-lg font-semibold text-gray-800">Working Hours</h2>
                
             <div className='overflow-x-auto'>
            <table className="min-w-full bg-white border border-gray-300 ">
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
                    startTime
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  endTime
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    status
                  </th>
                  <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                    hoursOfWork
                  </th>
                </tr>
              </thead>
              <tbody>
                {workingHours.workingHours && workingHours.workingHours.length > 0 ? (
                  workingHours.workingHours.map((workingHour, index) => (
                    <tr
                      key={workingHour.id || index} // Use unique `id` if available, fallback to `index`
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
                      onClick={() => handleRowClick(workingHour.id)}
                    >
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.employeeId}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.date}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.startTime}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.endTime}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.status}</td>
                      <td className="py-4 px-6 text-sm text-gray-800">{workingHour.hoursOfWork}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="py-4 px-6 text-center text-sm text-gray-800">
                      No Employee In Work
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
            </div>
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
