import {Navigate, Outlet} from "react-router-dom";
import useAuth from "@/hooks/useAuth.jsx";

const AuthRoute = ({needToken}) => {
    const {auth} = useAuth();
    if(!needToken || needToken && auth) {
        return <Outlet/>
    } else {
        return <Navigate replace to="/login"/>
    }
};

export default AuthRoute;
