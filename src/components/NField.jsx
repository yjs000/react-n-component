import {Field, FieldWrapper} from "@progress/kendo-react-form";
import {Input} from "@progress/kendo-react-inputs";

const NField = ({name, label, component : Component}) => {
    return (
        <FieldWrapper> {/*Style 때문에. 그리고 다른기능 추가될까봐 만들어놓음*/}
            <Field name={name} component={Component}  label={label} />
        </FieldWrapper>
    );
};

export default NField;
