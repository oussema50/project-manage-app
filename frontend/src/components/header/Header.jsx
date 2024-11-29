import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAdmin } from '../../utils/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage, removeLocalStorage } from '../../utils/localStorage';
import { login, logout } from '../../redux/slices/auth';
import ChatBot from '../chatbot/ChatBot';

export const Header = () => {
  const [isToken, setIsToken] = useState(false);
  const dispatch = useDispatch();
  let user = useSelector((state) => state.userAuth.user) || JSON.parse(getLocalStorage('user'));
  const navigate = useNavigate();
  // console.log('user============>>>>>>>>',user.user.id)
  useEffect(() => {
    if (!user) {
      user = getLocalStorage('user')
     
      const token = getLocalStorage('token')
      dispatch(login({user,token}))
    }
    user ? setIsToken(true) : setIsToken(false);
  }, [user]);

  const signout = () => {
    removeLocalStorage('token');
    removeLocalStorage('user');
    setIsToken(false);
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="bg-blue-600 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-white font-bold text-xl">
          <Link to="/">My App</Link>
        </div>
        <ul className="flex items-center space-x-6 text-white">
          <li>
            <Link to="/" className="hover:text-blue-300 transition">
              Home
            </Link>
          </li>
          {isToken && isAdmin() && (
            <li>
              <Link
                to="/rh-dashbord"
                className="hover:text-blue-300 transition"
              >
                RH Dashboard
              </Link>
            </li>
          )}
          {isToken && (
            <li>
              <Link
                to={`/employee-dashbord/${user&&user.id}`}
                className="hover:text-blue-300 transition"
              >
                Employee Dashboard
              </Link>
            </li>
          )}
          {isToken && (
            <li>
              <Link to="/holiday" className="hover:text-blue-300 transition">
                Holiday
              </Link>
            </li>
          )}
          {isToken && (
            <li>
              <Link to="/checkout" className="hover:text-blue-300 transition">
                Checkout
              </Link>
            </li>
          )}
          {!isToken && (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-300 transition">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-blue-300 transition">
                  Register
                </Link>
              </li>
            </>
          )}
          {isToken && (
            <li>
              <button
                onClick={signout}
                className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
              >
                Logout
              </button>
            </li>
          )}
          <ChatBot />
        </ul>
      </nav>
    </header>
  );
};
