import useSearch from "@/hooks/useSearch.jsx";
import {ComboBox} from "@progress/kendo-react-dropdowns";
import {useState} from "react";

const NComboField = ({url, param, config = {}, setSearcFieldValue, ...rest}) => {
    // const res = routeComboSearch;
    const {data} = useSearch(url, param, config);
    const dataItems = data?.items;
    console.log("rest", rest)
    const handleChange = (e) => {
        const value = e.value[rest.dataItemKey];
        setNComboFieldValue(value)
    }
    return (<ComboBox data={dataItems} {...rest} onChange={handleChange}/>)
}

export default NComboField;
