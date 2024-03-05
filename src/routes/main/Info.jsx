//route의 porps를 받으므로 routes폴더 안에 있어야 함.
import LogGrid from '@/components/LogGrid.jsx';
import { Input } from '@progress/kendo-react-inputs';
import useAxiosPrivate from '@/hooks/useAxiosPrivate.jsx';
import {Suspense, useEffect, useState} from 'react';
import useSearch from "@/hooks/useSearch";

const processGridData = data => {
    const items = data?.items ?? [];
    return items.map(d => ({...d, routeId : `id : ${d.routeId}`}))
};

const processExcelData = data => {
    return data?.items ?? [];
};

const Info = () => {

    //view를 그려줌.(view폴더를 따로빼도됨)
    return (
        <>
            <LogGrid
                grid={{ pageable: false, sortable: true }}
                columns={[
                    { field: 'routeId', title: 'ID', width: '250px' },
                    { field: 'routeName', title: 'NAME', width: '250px' }
                ]}
                fieldsets={[
                    { name: 'routeId', label: 'ID', component: Input },
                    { name: 'routeName', label: 'NAME', component: Input }
                ]}
                processGridData={processGridData}
            />
            {/*<div style={{width : "500px", height: "500px"}}>*/}
            {/*    <KakaoMap id={"map"}/>*/}
            {/*</div>*/}
        </>
    );
};

export default Info;
