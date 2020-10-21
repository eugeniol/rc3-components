import React, { useState, useEffect, useRef } from "react";
import {
    Col,
    Form,
    FormGroup,
    FormText,
    Legend,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    Option,
    Select,
    Fieldset,
    Button,
} from "@bootstrap-styled/v4";

export const OffersEditor = (props) => {
    const iframe = useRef();
    const handleOnLoad = () => {
        console.log("handleOnLoad", iframe);
        iframe.current.contentWindow.postMessage({
            action: "save",
            key: "keyForData",
            value: { },
        });
    };
    return (
        <iframe
            ref={iframe}
            src="http://localhost:3001/experiences/subscriptions/enrollment/"
            width="100%"
            onLoad={handleOnLoad}
            height="100%"
        />
    );
};
