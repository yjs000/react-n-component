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


const MySearchField = () => {
    return (
        <fieldset className={'k-form-fieldset'}>
            <NField name={'id'} label={'id'} component={Input} />
            <NField name={'name'} label={'이름'} component={Input} />
        </fieldset>
    )
}

const MyGrid = ({data}) => {
    return (
        <Grid data={data} pageable={false} sortable={true} style={{height: '300px'}}>
            <GridColumn field="routeId" title="ID" width="250px"/>
            <GridColumn field="routeNm" title="Name" width="250px"/>
        </Grid>
    );
}
const Info = () => {
    //view를 그려줌.(view폴더를 따로빼도됨)

    return (
        <>
            <LogGrid url={'route/combo/search'} searchParam={{ dbDiv: 'edit' }} searchField={MySearchField} grid={MyGrid}/>
            {/*<div style={{width : "500px", height: "500px"}}>*/}
            {/*    <KakaoMap id={"map"}/>*/}
            {/*</div>*/}
        </>
    );
};

export default Info;
