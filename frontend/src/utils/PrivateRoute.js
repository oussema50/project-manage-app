import { Navigate } from 'react-router-dom';
import { getLocalStorage,removeLocalStorage } from './localStorage';
import { jwtDecode } from 'jwt-decode';
import Toast from './toast';


export const ProtectedRoute = ({children}) => {
    if (getLocalStorage("token")) {
    const token = jwtDecode(getLocalStorage("token"))
      if (token.exp < Date.now() / 1000) {
        removeLocalStorage("token");
        
        return <Navigate to="/login" />
      }
      return <>{children}</>
    }
     
    return <Navigate to="/login" />
};
export const ProtectAuthRoute = ({children})=>{
    if (getLocalStorage("token")) {
        return <Navigate to="/" />
    }
    return <>{children}</>

}
export const ProtectedRhRoute = ({children}) => {
    if (getLocalStorage("token")) {
        const token = jwtDecode(getLocalStorage("token"))
        if (token.exp < Date.now() / 1000) {
            removeLocalStorage("token");
            removeLocalStorage("user");
            return <Navigate to="/login" />
        }
        if (token.role === "rh") {
            return <>{children}</>
        }
        Toast("error", "You are not authorized", "");
        return <Navigate to="/" />
    }
    return  <Navigate to="/login" />

};
 
export const isLogin = () => {
    // console.log("token from is login function",getLocalStorage("token"))
if (getLocalStorage("token")) {
    const token = jwtDecode(getLocalStorage("token"))
    console.log('token:====>',token)
    if (token.exp < Date.now() / 1000) {
        removeLocalStorage("token");
        removeLocalStorage("user");
    return false;
    }
    return true;
}
//alert("token is not exist");
return false;
};
  
export const isAdmin = () => {
    if(getLocalStorage('token')){
        const token = jwtDecode(getLocalStorage("token"))
        if (token.role === "rh") {
            return true;
        }
    }
    return false;
};