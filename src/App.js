import React, { useState, useEffect } from "react";
import BootstrapProvider from "@bootstrap-styled/provider";
import "./App.css";
import { Img, CardText, Button, CardBlock } from "@bootstrap-styled/v4";
import { useDetectOffers } from "./core/useDetectOffers";
import theme from "./theme";
import { Panel, DraggablePanel, Slice } from "./core/components/Panel";
import { CardFooter } from "@bootstrap-styled/v4/lib/Cards";

const OfferVersion = (props) => {
    const { response, error } = useDetectOffers();
    return (
        <>
            {error
                ? error
                : response
                ? response.split(/\n/).pop().split("v=").pop()
                : ""}
        </>
    );
};

const MerchantId = (props) => {
    const { response, error } = useDetectOffers();
    return (
        <>
            {error
                ? error
                : response
                ? response
                      .split(/\n/)
                      .slice(-2)[0]
                      .match(/module\.exports\("(\w+)","(\w+)"/)
                      .slice(-2)[0]
                : ""}
        </>
    );
};

function App() {
    return (
        <BootstrapProvider theme={theme}>
            <Panel
                draggable={true}
                style={{
                    width: "25vw",
                }}
                header={
                    <Img
                        style={{ pointerEvents: "none" }}
                        src="https://www.ordergroove.com/wp-content/uploads/2019/06/ordergroove_logo_rgb_color-1-1-e1561412936135.png"
                        width="100px"
                    />
                }
            >
                <Slice header="info">
                    Merchant= <MerchantId></MerchantId>
                    <br />
                    Version=<OfferVersion></OfferVersion>
                </Slice>
                <CardFooter>
                    <Button variant="primary">Go somewhere</Button>
                </CardFooter>
            </Panel>
        </BootstrapProvider>
    );
}

export default App;
