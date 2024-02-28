import {Field, FieldWrapper} from "@progress/kendo-react-form";
import {Input} from "@progress/kendo-react-inputs";

const NField = ({name, label, component : Component}) => {
    return (
        <FieldWrapper> {/*Style*/}
            <Field name={name} component={Component}  label={label} />
        </FieldWrapper>
    );
};

export default NField;
