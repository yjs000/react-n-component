//route의 porps를 받으므로 routes폴더 안에 있어야 함.
import {Input} from '@progress/kendo-react-inputs';
import MasterGrid from "@/components/MasterGrid.jsx";
import {Button} from "@progress/kendo-react-buttons";
import useSearch from "@/hooks/useSearch.jsx";
import NComboField from "@/components/NComboField.jsx";
import {dbComboSearch} from "@/js/testData.js";
import KakaoMap from "@/components/KakaoMap.jsx";
import {useState} from "react";

const onDetailBtnClick = (props) => {
}


//그리드
const url = 'route/combo/search';
const param = {
    dbDiv: 'edit'
};

//노선DB선택 Combo Field
const DbCombo = (props) => <NComboField data={dbComboSearch.items} /*url={url} param={param}*/ id={"dbCombo"} dataItemKey={"id"} textField={"nm"} setSearcFieldValue={setSearchFieldValue} {...props}/>

const useComboData = (params) => {
    const [initialData, setInitialData] = useState({});
    params.forEach(param => {
        const {data} = useSearch(param.url, param.param, param.config ?? {})
        setInitialData({...initialData, name: data?.items})
    })
    return {initialData}
}
const Info = () => {
    const {data} = useSearch(url, param);
    const {initialValues} = useComboData([{name : "db", url : "", param : {}}, {name: "routeId", url : "", param : {}}])
    //모든 filtering데이터가 dataItems에 있어야 함.
    const dataItems = {...data, items: data?.items?.map(item => {
            item.db = "edit"
            return item;
        })};

    //view를 그려줌.(view폴더를 따로빼도됨)
    return (
        <>
            <MasterGrid
                url={url}
                param={param}
                data={dataItems}
                fieldInitialValues={initialValues}
                columns={[
                    { field: 'routeId', title: 'ID', width: '250px', sort: "desc"},
                    { field: 'routeName', title: '노선명', width: '250px', sort: "desc"},
                    { field: 'detail', title: '상세', cell: (props) => {
                            return <td><Button onClick={() => onDetailBtnClick(props)} >상세</Button></td>
                        }
                    }
                ]}
                fieldsets={[
                    { name: 'db', label: '노선DB선택', component: DbCombo , operator: "contains"},
                    { name: 'routeId', label: 'ID', component: Input, operator: "contains"},
                    { name: 'routeName', label: 'NAME', component: Input , operator: "contains"}
                ]}
            />
            {/*<div style={{width : "500px", height: "500px"}}>*/}
            {/*    <KakaoMap id={"map"}/>*/}
            {/*</div>*/}
        </>
    );
};

export default Info;
