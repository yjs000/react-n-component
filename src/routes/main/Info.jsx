//route의 porps를 받으므로 routes폴더 안에 있어야 함.
import LogGrid from '@/components/LogGrid.jsx';
import { Input } from '@progress/kendo-react-inputs';
import useAxiosPrivate from '@/hooks/useAxiosPrivate.jsx';
import {Suspense, useEffect, useState} from 'react';
import useSearch from "@/hooks/useSearch";

const processGridData = data => {
    return data.map(d => ({...d, routeId : `id : ${d.routeId}`}))
};

const processExcelData = data => {
    return data;
};

const Info = () => {
    const {data, error} = useSearch('route/combo/search', {
        dbDiv: 'edit'
    });


    //view를 그려줌.(view폴더를 따로빼도됨)


    return (
        <>

            <LogGrid
                grid={{ pageable: true, sortable: true }}
                columns={[
                    { field: 'routeId', title: 'ID', width: '250px' },
                    { field: 'routeName', title: 'NAME', width: '250px' }
                ]}
                fieldsets={[
                    { name: 'test', label: 'test', component: Input },
                    { name: 'test', label: 'test', component: Input }
                ]}
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
