import {useEffect} from "react";

const {kakao} = window;
const KakaoMap = ({id, setMap}) => {
    useEffect(() => {
        const container = document.getElementById(id);
        const options = {
            center: new kakao.maps.LatLng(35.57905055, 129.317001),
            level: 4
        };

        const map = new kakao.maps.Map(container, options);
        setMap(map);

    }, []);



    return (
        <div id={id} style={{ width: '100%', height: '100%' }}></div>
    );
};

export default KakaoMap;
