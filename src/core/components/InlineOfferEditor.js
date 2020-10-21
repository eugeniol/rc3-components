import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import {
    Button,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@bootstrap-styled/v4";
import { OfferEditForm } from "../../forms/OfferEditForm";
import { getOffersTemplates } from "../static-utils";

export const InlineOfferEditor = ({ onDelete, ...props }) => {
    const ref = useRef();
    const [isEditorOpen, openEditor] = useState(false);

    const handleOnEdit = (ev) => {
        ev.preventDefault();
        openEditor(true);
    };
    useEffect(() => {
        const offer = document.createElement("og-offer");
        offer.setAttribute("product", "yum");
        offer.setAttribute("preview-standard-offer", true);
        ref.current.appendChild(offer);
        offer.setAttribute("location", "brand-new-location");
    }, []);

    const handleOnChange = (formData) => {
        getOffersTemplates("latest").then(({ getMarkup }) => {
            ref.current.querySelector("og-offer").innerHTML = getMarkup({
                ...formData,
                settings: {
                    ...formData.settings,
                    frequencies: [{ every: 1, period: 2, every: 2, period: 2 }],
                },
            });

            console.log("handleOnChange", getMarkup(formData));
        });
    };
    return (
        <>
            <Modal
                style={{
                    transform: "translate(-32vw,10px   )",
                    maxWidth: "35vw",
                }}
                isOpen={isEditorOpen}
                toggle={() => openEditor(!isEditorOpen)}
            >
                <ModalBody>
                    <OfferEditForm onChange={handleOnChange} />
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={() => openEditor(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <span style={{ position: "relative" }}>
                <ButtonGroup
                    size="sm"
                    style={{ position: "absolute", right: "0", top: "0" }}
                >
                    <Button onClick={handleOnEdit}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </ButtonGroup>

                <span
                    ref={ref}
                    style={{
                        display: "block",
                        border: "2px dashed green",
                        padding: "2px",
                        ...(isEditorOpen && {
                            position: "fixed",
                            zIndex: 999999,
                            border: "none",
                            background: "white",
                            boxShadow: " 2px 2px 2px 2px white",
                            top: ref.current.getClientRects()[0].y,
                            left: ref.current.getClientRects()[0].x,
                        }),
                    }}
                />
            </span>
        </>
    );
};

export default InlineOfferEditor;
