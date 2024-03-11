import {Form, FormElement} from '@progress/kendo-react-form';
import NField from '@/components/NField.jsx';
import {Input} from '@progress/kendo-react-inputs';
import {Button} from '@progress/kendo-react-buttons';
import {Grid, GridColumn, GridToolbar} from '@progress/kendo-react-grid';
import {useRef} from 'react';
import {ExcelExport} from '@progress/kendo-react-excel-export';
import useSearch from '@/hooks/useSearch.jsx';

const LogGrid = ({ processExcelData, processGridData, grid, columns, fieldsets , url, searchParam}) => {
    const _export = useRef(null);
    const { data } = useSearch(url, searchParam);
    const exportExcel = () => {
        _export.current.save();
    };
    const handleSubmit = data => {

    };

    return (
        <div>
            <ExcelExport
                data={ typeof processExcelData == 'function' ? processExcelData(data) : data}
                ref={_export}
            >
                <GridToolbar>
                    <Form
                        onSubmit={handleSubmit}
                        render={formRenderProps => (
                            <FormElement
                                style={{
                                    maxWidth: 650
                                }}
                            >
                                <fieldset className={'k-form-fieldset'}>
                                    {fieldsets
                                        ? fieldsets.map((f, idx) => <NField key={idx} {...f} />)
                                        : columns.map((col, idx) => (
                                              <NField
                                                  key={idx}
                                                  name={col.field}
                                                  label={col.title}
                                                  component={Input}
                                              />
                                          ))}
                                </fieldset>

                                <div className="k-form-buttons">
                                    <Button type="submit">조회</Button>
                                    <Button onClick={exportExcel}>Export to Excel</Button>
                                </div>
                            </FormElement>
                        )}
                    />
                </GridToolbar>
                <Grid
                    data={typeof processGridData == 'function' ? processGridData(data) : data}
                    style={{ height: '300px' }}
                    pageable={true}
                    sortable={true}
                    {...grid}
                >
                    {columns.map((col, idx) => (
                        <GridColumn key={idx} {...col} />
                    ))}
                </Grid>
            </ExcelExport>
        </div>
    );
};

export default LogGrid;
