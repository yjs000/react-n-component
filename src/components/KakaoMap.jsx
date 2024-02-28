import {useEffect} from "react";

const {kakao} = window;
const KakaoMap = ({id}) => {
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        const map = new kakao.maps.Map(container, options);
    }, []);


    return (
        <div id={id} style={{ width: '100%', height: '100%' }}></div>
    );
};

export default KakaoMap;
