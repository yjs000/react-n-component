import {Navigate} from "react-router-dom";
import useAuth from "@/hooks/useAuth.jsx";

const Divider = () => {
    const {auth} = useAuth();
    console.log("divider", auth)
    if(auth) {
        return <Navigate replace to="/main"/>
    } else {
        return <Navigate replace to="/login"/>
    }
};

export default Divider;
