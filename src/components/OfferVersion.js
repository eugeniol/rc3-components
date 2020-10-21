import React from "react";
import { useDetectOffers } from "../core/useDetectOffers";
import { Badge } from "@bootstrap-styled/v4";

export const OfferVersion = (props) => {
    const { response, error } = useDetectOffers();
    return (
        <Badge color={error ? "warning" : "success"} className="m-2">
            {error
                ? error
                : response
                ? response.split(/\n/).pop().split("v=").pop()
                : ""}
        </Badge>
    );
};
