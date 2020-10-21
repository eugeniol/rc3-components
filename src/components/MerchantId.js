import React from "react";
import { useDetectOffers } from "../core/useDetectOffers";
import { Badge } from "@bootstrap-styled/v4";

export const MerchantId = (props) => {
    const { response, error } = useDetectOffers();

    return (
        <Badge color={error ? "warning" : "success"} className="m-2"  >
            {error
                ? error
                : response
                ? response
                      .split(/\n/)
                      .slice(-2)[0]
                      .match(/module\.exports\("(\w+)","(\w+)"/)
                      .slice(-2)[0]
                : ""}
        </Badge>
    );
};
