import { memoize } from "lodash";
import { useState, useEffect } from "react";
const fetchMainJs = memoize((src) => fetch(src).then((res) => res.text()));

export function useDetectOffers() {
    const [response, setResponse] = useState();
    const [error, setError] = useState(false);
    useEffect(() => {
        const el = document.querySelector('script[src$="main.js"]');
        if (!el) return setError("no main.js detected");
        const src = el.getAttribute("src");
        if (!src.match("static.ordergroove.com")) return setError("no main.js");
        fetchMainJs(src).then(setResponse).catch(setError);
    }, []);
    return { response, error };
}
