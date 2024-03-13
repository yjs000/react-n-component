import { useState } from 'react';
import NField from '@/components/NField.jsx';
import { Input } from '@progress/kendo-react-inputs';

const SearchField = ({ children }) => {
    const [fieldValues, setFieldValues] = useState({});

    return <fieldset className={'k-form-fieldset'}>{children}</fieldset>;
};

export default SearchField;
