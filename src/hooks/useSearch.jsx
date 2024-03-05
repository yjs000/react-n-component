import {useEffect, useState} from "react";

export default function useAxiosPrivate(url, searchParam, config={}) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const search = async () => {
            try {
                const res = await axios.post(url, searchParam, config);
                if (res.data.status == 200) {
                    setData(res.data);
                } else if (res.data.status != null) {
                    alert('에러메시지띄워주세요');
                } else {
                    alert('데이터를 조회하는데 실패헀습니다.');
                }
            } catch (e) {
                setError(e);
            }
        };

        search();
    }, []);


    return {error, data}
}
