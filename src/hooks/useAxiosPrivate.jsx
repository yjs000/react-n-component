import {axiosPrivate} from "@/api/axiso";
import {useEffect} from "react";
import useAuth from "./useAuth";
import Logout from "@/routes/Logout.jsx";

export default function useAxiosPrivate() {
    const {auth} = useAuth();

    //왜 useEffect에 넣었는지 잘 모르겠음..
    // useEffect빼면 useRefresh에서 auth.token이 undefined임 why?
    useEffect(() => {
        //요청을 보내기 직전에 가로챔
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth}`;
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        //응답을 받은 직후 가로챔
        const responseIntercept = axiosPrivate.interceptors.response.use(
            async (res) => {
                if (res.data.status === 409) {
                    Logout();
                } else if (res.data.status === 201) {
                    const prevReq = res.config;

                    const _auth = res.data.token;
                    sessionStorage.setItem('_auth', JSON.stringify(_auth));

                    prevReq.headers["Authorization"] = "Bearer " + _auth;
                    prevReq.sent = true;

                    return axiosPrivate(prevReq);
                }
                return res;
            },

            async (err) => {
                return Promise.reject(err); //만료 이외의 모든 경우 err
            }
        );

        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };

    }, [auth]);

    return axiosPrivate;
}
