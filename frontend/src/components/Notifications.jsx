import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { addNotification } from "../redux/slices/notification";

const socket = io("http://localhost:3000");

const Notification = ({ employeeId }) => {
    const dispatch = useDispatch()
    console.log('Notification employeeId=====================',employeeId)
  useEffect(() => {
    socket.emit("register", employeeId);

    socket.on("notification", (data) => {
        dispatch(addNotification())
      alert(`New Notification: ${data.message}`);
    });

    return () => {
      socket.disconnect();
    };
  }, [employeeId]);

  return null;
};

export default Notification;
