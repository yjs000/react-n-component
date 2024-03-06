//route의 porps를 받으므로 routes폴더 안에 있어야 함.
import {Input} from '@progress/kendo-react-inputs';
import MasterGrid from "@/components/MasterGrid.jsx";

const processGridData = data => {
    // const items = data?.items ?? [];
    return data.map(d => ({...d, routeId : `id : ${d.routeId}`}))
    // console.log("process", data)
};

const processExcelData = data => {
    return data?.items ?? [];
};

const Info = () => {

    //view를 그려줌.(view폴더를 따로빼도됨)
    return (
        <>
            <MasterGrid
                url={'route/combo/search'}
                searchParam={{
                    dbDiv: 'edit'
                }}
                columns={[
                    { field: 'routeId', title: 'ID', width: '250px', sort: "desc"},
                    { field: 'routeName', title: 'NAME', width: '250px', sort: "desc"}
                ]}
                fieldsets={[
                    { name: 'routeId', label: 'ID', component: Input, operator: "contains"},
                    { name: 'routeName', label: 'NAME', component: Input , operator: "contains"}
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
