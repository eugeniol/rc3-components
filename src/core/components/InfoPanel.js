import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { Panel, DraggablePanel, Slice } from "core/components/Panel";
import logo from "logo.svg";
import { SiteInfo } from "core/components/SiteInfo";
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

export const InfoPanel = ({ onSelector }) => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Button color="primary" onClick={()=>setShow(!show)} className="mx-2">
                <FontAwesomeIcon icon={faInfo} />
            </Button>
            {show && (
                <Panel
                    style={{
                        position: "absolute",
                        width: "350px",
                        backgroundColor: "white",
                    }}
                    draggable
                    header={
                        <Img
                            style={{ pointerEvents: "none" }}
                            src={logo}
                            width="100px"
                        />
                    }
                >
                    {/* <Slice header="info">
                        Merchant= <MerchantId></MerchantId>
                        <br />
                        Version=<OfferVersion></OfferVersion>
                    </Slice> */}

                    <Slice header="Css overview">
                        <SiteInfo></SiteInfo>
                    </Slice>
                </Panel>
            )}
        </>
    );
};
