import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Toast from "../../utils/toast";
import { Link, useNavigate } from "react-router-dom";
import './auth.css'
const Register = () => {
  const navigate = useNavigate();
  let [isSuccess,setIsSuccess] = useState(false)
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    age: Yup.number()
      .required("Age is required")
      .min(18, "You must be at least 18 years old"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters"),
    role: Yup.string()
      .required("Role is required")
      .oneOf(["employee", "rh"], "Invalid role selection"),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    role: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/auth/register",
        values
      );
      setIsSuccess(true)
      resetForm();
    } catch (error) {
      Toast("error", error.message, "");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <Field
                    name="firstName"
                    type="text"
                    className="mt-1 p-2 border rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                  name="firstName"
                 component="h4" 
                 className="error"
                />
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <Field
                    name="lastName"
                    type="text"
                    className="mt-1 p-2 border rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  />
                 <ErrorMessage
                  name="lastName"
                 component="h4" 
                 className="error"
                />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    className="mt-1 p-2 border rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                  name="email"
                 component="h4" 
                 className="error"
                />
                </div>

                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    Age
                  </label>
                  <Field
                    name="age"
                    type="number"
                    className="mt-1 p-2 border rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                  name="age"
                 component="h4" 
                 className="error"
                />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    className="mt-1 p-2 border rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <ErrorMessage
                  name="password"
                 component="h4" 
                 className="error"
                />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <Field
                    as="select"
                    name="role"
                    className="mt-1 p-2 border rounded w-full focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select Role</option>
                    <option value="employee">employee</option>
                    <option value="rh">rh</option>
                  </Field>
                  <ErrorMessage
                  name="role"
                 component="h4" 
                 className="error"
                />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Registration Successful!</h2>
            <p className="mb-6">Your account has been created successfully.</p>
            <button
              onClick={() => {
                setIsSuccess(false);
                navigate("/login");
              }}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
