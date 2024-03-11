//route의 porps를 받으므로 routes폴더 안에 있어야 함.
import {Input} from '@progress/kendo-react-inputs';
import MasterGrid from "@/components/MasterGrid.jsx";
import {Button} from "@progress/kendo-react-buttons";
import {ComboBox} from "@progress/kendo-react-dropdowns";
import useSearch from "@/hooks/useSearch.jsx";
import {useEffect, useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.jsx";
import {routeComboSearch} from "@/js/testData.js";

const onDetailBtnClick = (props) => {
}

const useComboBox = (url, param, config) => {
    // const {data} = useSearch(url,param, config)
    const data = routeComboSearch;
    const items = data.items;
    const [value, setValue] = useState("");

    const handleChange = e => {
        setValue(e.value);
    }

    return {
        ComboBox: ({setFilter}) => {
            // useEffect(() => {
            //     setFilter({
            //         logic: 'or',
            //         filters: [{ field: "routeId", operator: "contains", value: '' }]
            //     })
            // }, [value]);

            useEffect(() => {
            }, [value]);


            return (<ComboBox data={items} id="dbCombo" textField="routeName" dataItemKey="routeId" value={value}
                              onChange={handleChange}/>);
        },
        value: value
    }
}

const url = 'route/combo/search';
const param = {
    dbDiv: 'edit'
};
const Info = () => {
    const {ComboBox, value} = useComboBox(url, param);
    // const {data} = useSearch(url, param);
    const res = routeComboSearch;
    const data = {...res, items: res?.items?.map(item => {
            item.db = "edit"
            return item;
        })};

    //view를 그려줌.(view폴더를 따로빼도됨)
    return (
        <>
            <MasterGrid
                url={url}
                param={param}
                data={data}
                columns={[
                    { field: 'routeId', title: 'ID', width: '250px', sort: "desc"},
                    { field: 'routeName', title: '노선명', width: '250px', sort: "desc"},
                    { field: 'detail', title: '상세', cell: (props) => {
                            return <td><Button onClick={() => onDetailBtnClick(props)} >상세</Button></td>
                        }
                    }
                ]}
                fieldsets={[
                    { name: 'db', label: '노선DB선택', component: ComboBox, operator: "eq"},
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
