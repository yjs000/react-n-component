import {Form, FormElement} from "@progress/kendo-react-form";
import NField from "@/components/NField.jsx";
import {Input} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";
import {Grid, GridColumn} from "@progress/kendo-react-grid";
import {useEffect, useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.jsx";



const LogGrid = ({url, searchParam, config = {}, searchField: CustomSearchField, grid:CustomGrid}) => {
    const axios = useAxiosPrivate();
    const [data, setData] = useState([]);
    const handleSubmit = data => {
        console.log(data);
    };

    useEffect(() => {
        const search = async () => {
            const res = await axios.post(url, searchParam, config);
            if (res.data.status == 200) {
                setData(res.data?.items);
                console.log(res.data?.items);
            } else if (res.data.status != null) {
                alert('에러메시지띄워주세요');
            } else {
                alert('데이터를 조회하는데 실패헀습니다.');
            }
        };
        search();
    }, []);

    return (
        <div>
            <Form
                onSubmit={handleSubmit}
                render={formRenderProps => (
                    <FormElement
                        style={{
                            maxWidth: 650
                        }}
                    >
                        <CustomSearchField/>
                        <div className="k-form-buttons">
                            <Button type="submit" onSubmit={handleSubmit} disabled={!formRenderProps.allowSubmit}>
                                조회
                            </Button>
                        </div>
                    </FormElement>
                )}
            />
            <CustomGrid data={data}/>
        </div>
    );
};

export default LogGrid;
