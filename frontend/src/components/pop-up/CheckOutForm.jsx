import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector,useDispatch } from "react-redux";
import { hiddenCheckOutPopUp } from "../../redux/slices/popUp";
import axios from "axios";
import { getLocalStorage } from "../../utils/localStorage";
import Swal from "sweetalert2";
import Notification from "../Notifications";
const CheckOutFormPopUp = ({id}) => {
    const initialValues = {
        checkoutTime: "",
        hoursOfCheckOut: "",
        reason: "",
      };
    const dispatch = useDispatch()
    const checkOutPopUp = useSelector(state=>state.popUp.checkOutPopUp)
    const token = useSelector(state=>state.userAuth.token) || getLocalStorage('token')
    // reason,checkoutTime,hoursOfCheckOut 
    const validationSchema = Yup.object().shape({
        checkoutTime: Yup.string().required("checkoutTime is required"),
        hoursOfCheckOut: Yup.string().required("hoursOfCheckOut is required"),
        reason: Yup.string().required("reason is required")
      });
      



  const handleSubmit = async(values, { resetForm }) => {
    console.log("check out Request:", values);
    try{
        const response = await axios.put(`http://localhost:5001/api/v1/working-hour/checkOut-request/${id}`,values, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }); 
            console.log('Data fetched successfully:', response.data);
            Swal.fire({
                title: "",
                text: response.data.msg,
                icon: "success"
              }); 
            return response.data;
          
        
    }catch(error){
        if (error.response) {
            console.error('Error response:', error.response.data);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error setting up the request:', error.message);
          }
        console.log(error.response.data.message)
          Swal.fire({
            icon: "error",
            text: error.response.data.message,
          });
        
    }
    resetForm();
    dispatch(hiddenCheckOutPopUp())
  };
  return (
    <div>
    {checkOutPopUp && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-xl font-bold mb-4">Check-out Request</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="max-w-lg mx-auto p-4 bg-white rounded shadow">
                {/* Checkout Time Input */}
                <div className="mb-4">
                  <label
                    htmlFor="checkoutTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Checkout Time
                  </label>
                  <Field
                    type="text"
                    id="checkoutTime"
                    name="checkoutTime"
                    placeholder="E.g., 09:00"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="checkoutTime"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
  
                {/* Hours of Checkout Input */}
                <div className="mb-4">
                  <label
                    htmlFor="hoursOfCheckOut"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Hours of Check-out
                  </label>
                  <Field
                    type="text"
                    id="hoursOfCheckOut"
                    name="hoursOfCheckOut"
                    placeholder="E.g., 2 hours 30 minutes"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="hoursOfCheckOut"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
  
                {/* Reason Input */}
                <div className="mb-4">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Reason for Check-out
                  </label>
                  <Field
                    as="textarea"
                    id="reason"
                    name="reason"
                    placeholder="Provide a reason for check-out"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="reason"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
  
                {/* Buttons */}
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => dispatch(hiddenCheckOutPopUp())}
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default CheckOutFormPopUp;
