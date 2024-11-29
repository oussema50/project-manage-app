import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../../utils/toast";
import { setLocalStorage } from "../../utils/localStorage";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/auth";
import {jwtDecode} from "jwt-decode";
import io from 'socket.io-client';
import './auth.css'
const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };
const socket = io('http://localhost:5001');

  useEffect(() => {
    // Listen for messages from the server
    // socket.on('message', (msg) => {
      
    //     setChat((prevChat) => [...prevChat, msg]);
    // });
    // socket.on('connected',()=>{
      
    // })
  //   return () => {
  //       socket.disconnect();
  //   };
}, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(3, "Minimum 3 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("http://localhost:5001/api/v1/auth/login", values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
     
      const user = response.data.user
      const token = response.data.token
      setLocalStorage('user',JSON.stringify(user))
      setLocalStorage("token", token);
      dispatch(login({user,token}));
      Toast("success", "Login Successful.", "");
      const tokenDecode = jwtDecode(response.data.token);
      socket.emit('login', user.id);
      
      
   
      if (tokenDecode.role === "rh") {
        navigate("/rh-dashbord");
      } else {
        navigate(`/employee-dashbord/${user.id}`);
      }
    } catch (error) {
      Toast("error", "Wrong credentials", "");
      setErrors({ server: error.response?.data?.message || "Login failed" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              {errors.server && (
                <div id="test-error" className="text-red-500 text-sm mb-4">{errors.server}</div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 text-left text-sm font-medium text-gray-700">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="email"
                 component="h4" 
                 className="error"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-left mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage
                  name="password"
                 component="h4" 
                 className="error"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
