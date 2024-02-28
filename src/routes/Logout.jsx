import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {deleteCookie, getCookie} from "@/js/cmmn.js";
import useAuth from "@/hooks/useAuth.jsx";

/**
 * 로그아웃 시 동작을 더 추할 수 있도록 Logout Component를 만듦
 */
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
