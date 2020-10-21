import React from "react";
import BaseForm from "react-jsonschema-form";

import fields from "fields";
import widgets from "widgets";
import ObjectFieldTemplate from "widgets/ObjectFieldTemplate";
import { DefaultTemplate } from "fields/templates/DefaultTemplate";

export const Form = ({
    schema,
    uiSchema,
    className,
    formData,
    onSubmit,
    onFocus,
    onChange,
    disabled,
    ...props
}) => {
    return (
        <BaseForm
            formData={formData}
            onSubmit={onSubmit}
            onFocus={onFocus}
            onChange={onChange}
            disabled={disabled}
            className={className}
            schema={schema}
            uiSchema={uiSchema}
            fields={fields}
            widgets={widgets}
            ObjectFieldTemplate={ObjectFieldTemplate}
            FieldTemplate={DefaultTemplate}
            {...props}
        >
            {" "}
        </BaseForm>
    );
};

export default Form;
