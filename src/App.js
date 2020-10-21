import React, { useState, useEffect, useRef } from "react";

import BootstrapProvider from "@bootstrap-styled/provider";
import "./App.css";
import { useDetectOffers } from "./core/useDetectOffers";
import { MerchantId } from "components/MerchantId";
import { OfferVersion } from "components/OfferVersion";
import theme from "./theme";

import {
    Img,
    A,
    Form,
    Input,
    Button,
    Navbar,
    Container,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
} from "@bootstrap-styled/v4";

import { OffersEditor } from "./core/components/OffersEditor";

import logo from "./logo.svg";

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@bootstrap-styled/v4";

import { DraggableOffer } from "./core/components/DraggableOffer";
import { injectMainJs } from "./core/static-utils";
import { OfferEditForm } from "./forms/OfferEditForm";
import { InfoPanel } from "./core/components/InfoPanel";

function App() {
    const { error } = useDetectOffers();

    useEffect(() => {
        async function effect() {
            if (error) {
                await injectMainJs("merchantId", window);
                console.log("injectMainJs(window)");
            }
        }
        effect();
    }, [error]);

    return (
        <div
            style={{
                position: "fixed",
                zIndex: 10000,
                width: "100vw",
                height: "100px",
                top: "0",
                left: "0",
                // background: "rgba(0,0,0,.5)",
            }}
        >
            <BootstrapProvider theme={theme}>
                <Navbar color="secondary" light inverse toggleable="lg">
                    <div className="d-flex justify-content-between">
                        <NavbarBrand tag={A} to="javascript:;">
                            <Img
                                style={{ pointerEvents: "none" }}
                                src={logo}
                                width="100px"
                            />
                        </NavbarBrand>
                    </div>
                    <Nav navbar className="mr-auto">
                        <NavItem>
                            <DraggableOffer />
                        </NavItem>
                        <NavItem>
                            <InfoPanel />
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <MerchantId />
                        </NavItem>
                        <NavItem>
                            <OfferVersion />
                        </NavItem>
                    </Nav>
                </Navbar>


            </BootstrapProvider>
        </div>
    );
}

export default App;
