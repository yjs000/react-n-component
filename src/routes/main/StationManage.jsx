import axios from '@/api/axiso.js';
import KakaoMap from '@/components/KakaoMap.jsx';
import { useEffect, useState } from 'react';
import {Button} from "@progress/kendo-react-buttons";

const { AKM } = window;
const akm = AKM();

let newBusStopMarker = null;
let clickPolyLine = null;
const Stationmanage = () => {
    const [busStops, setBusStops] = useState([]);
    const [routeVertexes, setRouteVertexes] = useState([]);
    const [map, setMap] = useState(null);
    const [coordinateMarker, setCoordinateMarker] = useState(null);
    const setCoordinate = () => {
        axios.post("/bus-stop/coordinate-on-link/search", {
            "longitude": newBusStopMarker.getPosition().getLng(),
            "latitude": newBusStopMarker.getPosition().getLat(),
            "linkId": clickPolyLine.id
        }).then(res => {
            const data = res.data?.item;
            const newLatLng = new kakao.maps.LatLng(data?.latitude, data?.longitude);
            if(coordinateMarker != null) {
                coordinateMarker.setPosition(newLatLng);
            } else {
                const marker = new kakao.maps.Marker({
                    // 지도 중심좌표에 마커를 생성합니다
                    position: newLatLng
                });
                setCoordinateMarker(marker);
            }

        });
    }

    useEffect(() => {
        axios
            .post('/route/link-vertex/search', {
                dbDiv: 'edit',
                routeId: '192000100'
            })
            .then(res => {
                const routes = res.data?.items ?? [];
                setRouteVertexes(routes);
            });


    }, []);

    useEffect(() => {
        if(map != null) {
            //새 정류장 마커
            const marker = new kakao.maps.Marker({
                position: map.getCenter(),
                draggable: false
            });
            newBusStopMarker = marker;

            //드래그이벤트
            kakao.maps.event.addListener(newBusStopMarker, 'dragend', function () {
                console.log(newBusStopMarker, "dragend");
                setCoordinate();
            });

            //클릭이벤트
            const mouseClickEvent = mouseEvent => {
                var latlng = mouseEvent.latLng;
                newBusStopMarker.setPosition(latlng);
                newBusStopMarker.setMap(map);

                var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
                message += '경도는 ' + latlng.getLng() + ' 입니다';
                console.log(message)

                kakao.maps.event.removeListener(map, 'click', mouseClickEvent);//한번만 click하고 클릭 뭇함
            }

            kakao.maps.event.addListener(map, 'click', mouseClickEvent);
        }
    }, [map]);



    useEffect(() => {
        if(coordinateMarker != null) {
            coordinateMarker.setMap(map);
            console.log("coordinate", coordinateMarker.getPosition().toString())
            newBusStopMarker.setDraggable(true)
        }
    }, [coordinateMarker]);


    //정류장 마커찍기
    const markerPositions = busStops.map(stop => {
        return {
            title: stop.koreanName,
            latlng: new kakao.maps.LatLng(stop.latitude, stop.longitude)
        };
    });
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const imageSize = new kakao.maps.Size(24, 35);
    markerPositions.forEach(pos => new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: pos.latlng, // 마커를 표시할 위치
        title: pos.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        image: new kakao.maps.MarkerImage(imageSrc, imageSize)  // 마커 이미지
    }));

    //노선찍기
    routeVertexes.forEach(link => {
        const linePath = link.vertexes.map(vertex => new kakao.maps.LatLng(vertex.latitude, vertex.longitude));
        const polyline = new kakao.maps.Polyline({
            path: linePath, // 선을 구성하는 좌표배열 입니다
            strokeWeight: 5, // 선의 두께 입니다
            strokeColor: '#FFAE00', // 선의 색깔입니다
            strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
            strokeStyle: 'solid', // 선의 스타일입니다
        });
        clickPolyLine = polyline
        clickPolyLine.id = link.linkId
        kakao.maps.event.addListener(polyline, 'click', function() {
            setCoordinate();
        });
        polyline.setMap(map);
    })

    return (
        <>
            <h1>수선의발 테스트</h1>
            <div style={{ width: '700px', height: '700px' }}>
                <KakaoMap id={'map'} setMap={setMap} />
            </div>
        </>
    );
};

export default Stationmanage;
