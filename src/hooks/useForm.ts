import React, { useEffect, useState } from 'react';

type FormState = {
    [key: string]: {
        name: string;
        value: string;
        isRequired: boolean;
        errorMessage: string;
    };
}

const useFormHook = (initialState: FormState = {}) => {
    const [formInputs, setFormInputs] = useState(initialState);
    const initialValues = Object.values(initialState).join('');

    useEffect(() => {
        setFormInputs(initialState);
    }, [initialValues]);

    const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value, name, type } = e.target;

        if (type === 'number') {
            // value = parseInt(value);
        } else if (type === 'file') {
            // [value] = e.target.files;
        } else {
            setFormInputs(prevInputs => ({
                ...prevInputs,
                [name]: {
                    ...prevInputs[name],
                    name,
                    value,
                },
            }));
        }
    };

    const handleResetForm = () => {
        setFormInputs(initialState);
    };

    const handleClearForm = () => {
        setFormInputs({})
    };

    return {
        formInputs,
        handleInputChanges,
        handleResetForm,
        handleClearForm,
    };
};

export default useFormHook;