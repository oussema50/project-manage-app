import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import { getAllEmployees } from '../../redux/slices/employees';
import LoadingSpinner from '../LoadingSpinner';
import { getLocalStorage } from '../../utils/localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { load, stopLoad } from '../../redux/slices/loading';

const EmployeesTable = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const employees = useSelector(state=>state.employees.employees)
  const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
  const loading = useSelector(state=>state.loading.loading)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const handleRowClick = (id) => {
    navigate(`/employee-dashbord/${id}`);
  };
  useEffect(()=>{
    dispatch(load())
    handleRequest([{page:currentPage},token])
    dispatch(stopLoad())

  
  },[currentPage])

  const handleRequest = ([query,token])=>{
    
    dispatch(getAllEmployees([query,token]))

  }
  const handleNext = () => {
    if (currentPage < employees.totalPages) setCurrentPage(currentPage + 1);
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
              <h2 className="text-lg font-semibold text-gray-800">Employees</h2>
              
            </div> 
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  ID
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
                  Age
                </th>
                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
            {employees.users &&
              employees.users.map((person, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-300 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition-colors duration-200 cursor-pointer`}
                >
                  <td className="py-4 px-6 text-sm text-gray-800">{person.id}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{person.firstName}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{person.lastName}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{person.email}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{person.age}</td>
                  <td className="py-4 px-6 text-sm text-gray-800">{person.role}</td>
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
            Page {currentPage} of {employees.totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === employees.totalPages}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg ${
              currentPage === employees.totalPages
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
};

export default EmployeesTable;
