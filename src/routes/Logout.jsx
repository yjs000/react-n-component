import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {deleteCookie, getCookie} from "@/cmmn.js";
import useAuth from "@/hooks/useAuth.jsx";

const Logout = () => {
    const navigate = useNavigate();
    const {setAuth} = useAuth();
    useEffect(() => {
        deleteCookie("token");
        setAuth(getCookie("token"));
        console.log("cookie", getCookie("token"));
        return navigate("/")
    }, []);
};

export default Logout;
