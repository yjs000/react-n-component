import {Form, FormElement} from '@progress/kendo-react-form';
import NField from '@/components/NField.jsx';
import {Input} from '@progress/kendo-react-inputs';
import {Button} from '@progress/kendo-react-buttons';
import {Grid, GridColumn, GridToolbar} from '@progress/kendo-react-grid';
import {useEffect, useRef, useState} from 'react';
import {ExcelExport} from '@progress/kendo-react-excel-export';
import {filterBy, orderBy} from '@progress/kendo-data-query';
import useAxiosPrivate from "@/hooks/useAxiosPrivate.jsx";

/**
 * 페이징없음
 */
/**
 *
 * @param processExcelData excel의 data 정제하는 함수.
 * @param processGridData grid의 data 정제하는 함수.
 * @param grid <Grid/>의 props설정
 * @param columns <GridColumns/>설정. <GridColumns/>의 props
 *  - 추가된 prop
 *    - sort : boolean
 * @param fieldsets 조회조건 <NField/> 달아주는 설정. <Field/>의 props
 *  - 추가된 prop
 *    - operator : [contains | eq | between]
 * @param url gird 조회 url
 * @param param grid 조회 param
 */
const MasterGrid = ({
    processExcelData,
    processGridData,
    grid,
    columns,
    fieldsets,
    // url,
    // param,
    data,
}) => {
    console.log("grid Data", JSON.stringify(data)?.substring(0, 100))
    const _export = useRef(null);
    const exportExcel = () => {
        _export.current.save();
    };
    const initalSort = columns.reduce((acc, col) => {
        if (col.sort) {
            acc.push({ field: col.field, dir: col.sort });
        }
        return acc;
    }, []);
    const initialFilter = {
        logic: 'and',
        filters: fieldsets.reduce((acc, field) => {
            acc.push({ field: field.name, operator: field.operator, value: '' });
            return acc;
        }, [])
    };
    const [sort, setSort] = useState(initalSort);
    const [filter, setFilter] = useState({
        "logic": "and",
        "filters": [
            {
                "field": "db",
                "operator": "eq",
                "value": "edit"
            },
            {
                "field": "routeId",
                "operator": "contains",
                "value": ""
            },
            {
                "field": "routeName",
                "operator": "contains",
                "value": "지원"
            }
        ]
    });
    // const [rows, setRows] = useState([]);

    console.log("filter", filter)
    const rows = filterBy(data?.items ?? [], filter);

    // useEffect(() => {
    //     console.log("row bf", rows)
    //     console.log("filter", filter);
    //     const newRows = orderBy(filterBy(data?.items?? [], filter), sort);
    //     console.log("row af", newRows)
    //     setRows(newRows);
    // }, [data, filter, sort]);

    const handleSubmit = data => {
        console.log("handleSubmit")
        const newFilters = [...filter.filters];
        newFilters.forEach(obj => {
            obj.value = data[obj.field] ?? "";
        });
        setFilter({ ...filter, filters: newFilters });
    };

    return (
        <div>
            <ExcelExport
                data={rows}
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
                                        ? fieldsets.map((f, idx) => <NField key={idx} {...f}  />)
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
                    data={rows}
                    style={{ height: '300px' }}
                    pageable={false}
                    sortable={{
                        mode: 'multiple'
                    }}
                    sort={sort}
                    onSortChange={e => {
                        setSort(e.sort);
                    }}
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

export default MasterGrid;
