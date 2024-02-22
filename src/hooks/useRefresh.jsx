import { useNavigate } from "react-router";
import axios from "@/api/axiso";
import useAuth from "@/hooks/useAuth";
import useAck from "@/hooks/useAck";

export default function useRefresh() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const {isAcked, setIsAcked} = useAck();
    const refresh = async () => {
        try {
            const res = await axios("/authenticate/refresh", {
                method: "post",
                headers: {
                    RefreshToken: auth?.refreshToken,
                },
            });
            setAuth((prev) => {
                return { ...prev, ...res.data };
            });
            return res.data;
        } catch (err) {
            sessionStorage.clear();
            setIsAcked("false");
            navigate("/");
            Promise.reject(err);
        }
    };
    return refresh;
}
