import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

const App = React.lazy(() => import("./App"));

/* eslint-disable camelcase, no-undef */

const OG_STATIC_PATH =
    window.OG_STATIC_PATH ||
    Array.from(document.querySelectorAll("script"))
        .pop()
        .src.replace(/(\/)[^\/]+$/, "$1");
__webpack_require__.p = OG_STATIC_PATH;

/* eslint-enable */

const PANEL_NAME = "rc3-inline-editor";
let div = document.querySelector("#" + PANEL_NAME);

function bootstrap() {
    if (!div) {
        div = document.createElement("div");
        div.id = PANEL_NAME;
        div.style.position = "fixed";
        div.style.zIndex = 10000;
        div.style.top = "0";
        div.style.top = "0";
        div.style.left = "0";
        document.body.appendChild(div);
        document.body.style.paddingTop = "100px";
    }

    ReactDOM.render(
        <React.StrictMode>
            <Suspense fallback={"Loading..."}>
                <App />
            </Suspense>
        </React.StrictMode>,
        div
    );
}

if (document.readyState == "loading") {
    window.addEventListener("load", bootstrap);
} else {
    bootstrap();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// // load
// (p=>{document.createElement("script");s.src = p; document.body.appendChild(s)})('http://localhost:3001/')
// const s = document.createElement("script");
// s.src = "http://localhost:3001/";
// document.body.appendChild(s);
