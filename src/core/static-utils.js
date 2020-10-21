import memoize from "lodash/memoize";
import get from "lodash/get";
// import { mapStyles } from '@ordergroove/inject-css-override';
const mapStyles = () => {};
export const load = memoize((url) => {
    let mod;
    const myDefine = (dep, lib) => {
        mod = lib();
    };
    myDefine.amd = true;
    return fetch(url, {
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
    })
        .then((res) => res.text())
        .then((src) => new Function("define", src)(myDefine))
        .then(() => mod);
});

export const resolveStaticServerUrl = (path) =>
    window.location.hostname === "rc3.ordergroove.com"
        ? `https://static.ordergroove.com/${path}`
        : `https://staging.static.ordergroove.com/${path}`;

export const getStyles = ({ styles, selector } = {}) => {
    const cssChunk = `* {\n  ${
        styles &&
        mapStyles(typeof styles === "object" ? styles : {})
            .map((it) => it.join(": "))
            .join(";\n  ")
    };\n}`;
    return cssChunk;
};

export const getOffersTemplates = (version) =>
    load(
        resolveStaticServerUrl(`@ordergroove/offers-templates/${version}/`)
    ).then((mod) => ({
        getMarkup: mod.getMarkup,
        getStyles: mod.getStyles || getStyles,
    }));

export function getVersionOr(meta_fields, name, defaultVersion = "latest") {
    const version = get(meta_fields, ["dependencies", name], "");
    return version === "latest"
        ? version
        : version.replace(/^\D/, "") || defaultVersion;
}

export const getOffersMetaFields = async (meta_fields) => {
    const offersVersion = getVersionOr(meta_fields, "@ordergroove/offers");
    const offersTemplatesVersion = getVersionOr(
        meta_fields,
        "@ordergroove/offers-templates"
    );
    const { getMarkup, getStyles } = await getOffersTemplates(
        offersTemplatesVersion
    );

    return { offersVersion, offersTemplatesVersion, getMarkup, getStyles };
};

export function createOfferElement(document, preview) {
    const el = document.createElement("og-offer");
    el.setAttribute("product", "some-product");
    if (preview === "standard-offer") {
        el.setAttribute("preview-standard-offer", true);
    } else if (preview === "upsell-offer") {
        el.setAttribute("preview-upsell-offer", true);
    }
    return el;
}

export const getOffersStaticUrl = (version) =>
    resolveStaticServerUrl(`@ordergroove/offers/${version}/`);

export function initializeOffers(og, version, merchantId) {
    og.offers(merchantId, "staging").setPublicPath(
        resolveStaticServerUrl(`@ordergroove/offers/${version}/dist/`)
    );
}

export function injectMainJs(merchantId, contentWindow = window, version = "latest") {
    const script = contentWindow.document.createElement("script");
    return new Promise((resolve, reject) => {
        script.onerror = reject;
        script.onload = function () {
            initializeOffers(contentWindow.og, version, merchantId);

            resolve(contentWindow.og);
        };
        script.src = getOffersStaticUrl(version);
        contentWindow.document.head.appendChild(script);
    });
}
