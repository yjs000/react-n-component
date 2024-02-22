import {axiosPrivate} from "@/api/axiso";
import {useRef, useEffect, useState} from "react";
import useAuth from "./useAuth";
import useRefresh from "./useRefresh";
import useAck from "@/hooks/useAck.jsx";
import {useNavigate} from "react-router";
import axios from "@/api/axiso.js";

export default function useAxiosPrivate() {
    const {auth} = useAuth();
    const refresh = useRefresh();
    const axiosCheckArray = useRef([]);
    const {isAcked, setIsAcked} = useAck();
    const navigate = useNavigate();

    //타이머
    const maxTime = 5;
    const [timerFlag, setTimerFlag] = useState(false);

    //왜 useEffect에 넣었는지 잘 모르겠음..
    // useEffect빼면 useRefresh에서 auth.token이 undefined임 why?
    useEffect(() => {
        //요청을 보내기 직전에 가로챔
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                axiosCheckArray.current.push(0);
                if (axiosCheckArray.current.length === 1) {
                    document.getElementsByClassName('k-loading-mask')[0].style.display = "block";
                }
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.token}`;
                    config.headers["RefreshToken"] = auth?.refreshToken;
                }
                // config.headers["Authorization"] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZW9ubGVlMiIsIk5laWdoYm9yQVBJIjoiUk9MRV9BRE1JTiIsImV4cCI6MTY3MTQ0MTg2OX0.ADInpywsLw6lORHpOKcqtv8uGhPU7WMjzAcGa2eS-ysqYv3xoNZ2XS38bPHH4BzUA2yaqhV7JGNMZMi4e_8Q3g'
                // config.headers["RefreshToken"] = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJnZW9ubGVlMiIsIk5laWdoYm9yQVBJIjoiUk9MRV9BRE1JTiIsImV4cCI6MTY3MTUyNTE4N30.hfghECLnA57Vq5Q7iWLCqiye0K4v23q4I5zQOB-6Der6Qwk9Oa4iArwg4azU7v69Y7CASU9zGhAzRBlOoIxAmw'
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        //응답을 받은 직후 가로챔
        const responseIntercept = axiosPrivate.interceptors.response.use(
            async (res) => {
                axiosCheckArray.current.pop();
                if (axiosCheckArray.current.length === 0) {
                    document.getElementsByClassName('k-loading-mask')[0].style.display = "none";
                    axiosCheckArray.current = [];
                    if (timer.current !== null) {
                        clearTimeout(timer.current);
                    }

                    if (res.data.status === 409) {
                        if (sessionStorage.getItem('duple') === '0') {
                            sessionStorage.setItem('duple', '1');
                            alert(res.data.message)
                        }

                        sessionStorage.clear();
                        setIsAcked('false')
                        navigate("/")
                    } else if (res.data.status === 201) {
                        const prevReq = res.config;

                        const _auth = {
                            token: res.data.token,
                            refreshToken: auth.refreshToken,
                        };
                        sessionStorage.setItem('_auth', JSON.stringify(_auth));

                        prevReq.headers["Authorization"] = "Bearer " + _auth.token;
                        prevReq.headers["RefreshToken"] = _auth.refreshToken;
                        prevReq.sent = true;

                        return axiosPrivate(prevReq);
                    }

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

    }, [auth, refresh]);

    const timer = useRef(null);

    useEffect(() => {
        timer.current = setTimeout(() => {
            if (document.getElementsByClassName('k-loading-mask')[0].style.display === "block") {
                document.getElementsByClassName('k-loading-mask')[0].style.display = "none"
                axiosCheckArray.current = [];
            }
        }, 1000 * maxTime);

        return () => {
            clearTimeout(timer.current);
        }
    }, [document.getElementsByClassName('k-loading-mask')[0]?.style.display]);

    return axiosPrivate;
}
