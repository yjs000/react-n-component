import {Form, FormElement} from "@progress/kendo-react-form";
import NField from "@/components/NField.jsx";
import {Input} from "@progress/kendo-react-inputs";
import {Button} from "@progress/kendo-react-buttons";
import {Grid, GridColumn, GridToolbar} from "@progress/kendo-react-grid";
import {useEffect, useRef, useState} from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate.jsx";
import {ExcelExport} from "@progress/kendo-react-excel-export";



const LogGrid = ({gridData, excelData, grid, columns, fieldsets}) => {
    const _export = useRef(null);

    const handleSubmit = data => {
        console.log(data);
    };

    const exportExcel = () => {
        _export.current.save();
    };



    return (
        <div>
            <ExcelExport
                data={excelData}
                ref={_export}
                >
                <Form
                    onSubmit={handleSubmit}
                    render={formRenderProps => (
                        <FormElement
                            style={{
                                maxWidth: 650
                            }}
                        >
                            <fieldset className={'k-form-fieldset'}>
                                {fieldsets ?
                                    fieldsets.map((f, idx) => <NField key={idx} {...f}/>)
                                    :
                                    columns.map((col, idx) => <NField key={idx} name={col.field} label={col.title} component={Input}/>)

                                }




                            </fieldset>
                        </FormElement>
                    )}
                />
                <GridToolbar>
                    <div className="k-form-buttons">
                        <Button type="submit" onSubmit={handleSubmit}>
                            조회
                        </Button>
                        <Button onClick={exportExcel}>Export to Excel</Button>
                    </div>
                </GridToolbar>
                <Grid data={gridData} style={{ height: '300px' }} {...grid}>
                    {columns.map((col, idx) => <GridColumn key={idx} {...col} />)}
                </Grid>
            </ExcelExport>
        </div>
    );
};

export default LogGrid;
