//route의 porps를 받으므로 routes폴더 안에 있어야 함.
import KakaoMap from '@/components/KakaoMap.jsx';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import LogGrid from '@/components/LogGrid.jsx';
import { Input } from '@progress/kendo-react-inputs';
import SearchField from '@/components/SearchField.jsx';
import useAxiosPrivate from '@/hooks/useAxiosPrivate.jsx';
import { useEffect, useState } from 'react';
import ButtonField from '@/components/ButtonField.jsx';
import { Field, FieldWrapper, Form, FormElement } from '@progress/kendo-react-form';
import NField from '@/components/NField.jsx';
import { Button } from '@progress/kendo-react-buttons';
import axios from "@/api/axiso"


const processGridData= (data) => {
    return data;
}
const processExcelData = (data) => {
    return data;
}
const Info = () => {
    // const axios = useAxiosPrivate();
    const [data, setData] = useState([]);

    useEffect(() => {

        // const search = async (url, searchParam, config = {}) => { //hook으로 빼기
        //     const res = await axios.post(url, searchParam, config);
        //     if (res.data.status == 200) {
        //         setData(res.data?.items);
        //         console.log(res.data?.items);
        //     } else if (res.data.status != null) {
        //         alert('에러메시지띄워주세요');
        //     } else {
        //         alert('데이터를 조회하는데 실패헀습니다.');
        //     }
        // };
        // const res = axios.post("route/combo/search", {
        //     "dbDiv": "edit"
        // });
        // res.then(json => console.log(json))
        // search("route/combo/search", {
        //     "dbDiv": "edit"
        // }, {});

    }, []);
    //view를 그려줌.(view폴더를 따로빼도됨)
    
    let _export;
    return (
        <>
                <LogGrid
                    grid={{pageable: true, sortable: true}}
                    columns={[
                        {field : "routeId", title : "ID", width : "250px"},
                        {field : "routeNm", title : "NAME", width : "250px"}
                    ]}
                    fieldsets={[{name: "test", label: "test", component: Input}, {name: "test", label: "test", component: Input}]}
                    gridData={processGridData(data)}
                    excelData={processExcelData(data)}
                />
            {/*<div style={{width : "500px", height: "500px"}}>*/}
            {/*    <KakaoMap id={"map"}/>*/}
            {/*</div>*/}
        </>
    );
};

export default Info;
