import React, { useState } from "react";
import defaultsDeep from "lodash/defaultsDeep";
import omit from "lodash/omit";
import get from "lodash/get";

import { SmallLoaderIndicator } from "components/SmallLoaderIndicator";
import { getDefinition, useExternalSchema } from "hooks/useExternalSchema";
import Form from "./Form";
import mapDeep from "deepdash/mapDeep";

export const variationUiSchema = {
    "ui:order": [
        "*",
        "advancedMode",
        "settings",
        "markup",
        "textCopy",
        "styles",
        "css",
    ],

    settings: {
        defaultFrequency: {
            "ui:field": "defaultFrequency",
        },
    },
    advancedMode: {
        "ui:widget": "hidden",
    },
    markup: {
        "ui:field": "codeEditor",
        classNames: "advanced-mode-html",
        label: "HTML",
        "ui:options": {
            mode: "html",
        },
    },

    css: {
        "ui:field": "codeEditor",
        classNames: "advanced-mode-css",
        "ui:options": {
            "ui:title": "CSS",

            mode: "css",
        },
    },

    textCopy: {
        "ui:order": [
            "defaultFrequencyCopy",
            "offerOptInLabel",
            "offerEveryLabel",
            "offerOptOutLabel",
            "showTooltip",
            "*",
        ],
        "ui:options": {
            label: false,
        },
        showTooltip: {
            "ui:widget": "toggle",
            classNames: "react-toggle-form-control",
        },
        offerTooltipContent: {
            "ui:widget": "textarea",
            draftRte: {
                toolbar: {
                    options: ["inline"],
                },
            },
        },
    },
    styles: {
        global: {
            "ui:title": "Global font",
            "ui:field": "font",
        },
        tooltip: {
            "ui:title": "Tooltip font",
            "ui:field": "font",
        },
        tooltipBackground: {
            "ui:title": "Tooltip background color",
            "ui:widget": "color",
        },
        tooltipBoxShadow: {
            "ui:title": "Tooltip drop shadow",
            "ui:widget": "boxShadow",
        },
        tooltipPlacement: {
            "ui:title": "Tooltip position",
        },
    },
};

export const mapFormDataToPlaceholders = (formData) =>
    mapDeep(formData, (text) => ({ "ui:placeholder": text }), {
        leavesOnly: true,
    });

export const ErrorContainer = (props) => (
    <p className="alert alert-danger" id="load-error">
        {props.children}
    </p>
);

export const SingleVariationForm = ({
    // formData,
    schema,
    rootFormData,
    onChange,
    ...props
}) => {
    const [formData, setFormData] = useState({});
    const handleOnChange = ({ formData }) => {
        setFormData(formData);
        onChange && onChange(formData);
    };
    const uiSchema = defaultsDeep(
        {
            "ui:order": ["elements", "*"],
            ...variationUiSchema,
            elements: {
                "ui:widget": "hidden",
            },
        },
        mapFormDataToPlaceholders(rootFormData)
    );
    return (
        <Form
            uiSchema={uiSchema}
            // schema={omit(schema, ["default"])}
            schema={schema}
            formData={formData}
            onChange={handleOnChange}
            {...props}
        />
    );
};

export const OfferEditForm = ({ version = "latest", formData, ...props }) => {
    const { schema, isLoading, error } = useExternalSchema(
        "@ordergroove/offers",
        version
    );

    return isLoading ? (
        <SmallLoaderIndicator />
    ) : error ? (
        <ErrorContainer error={error} />
    ) : (
        schema && (
            <SingleVariationForm
                // key={currentVaritation}
                // rootFormData={initialFormData}
                schema={getDefinition(
                    schema,
                    "SubscriptionEnrollmentVariation"
                )}
                // formData={get(
                //     initialFormData,
                //     ["elements", currentVaritation - 1],
                //     {}
                // )}
                // onChange={handleVariationOnChange}
                {...props}
            />
        )
    );
};
