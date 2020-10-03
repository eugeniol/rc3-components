import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
const PANEL_NAME = "rc3-inline-editor";
let div = document.querySelector("#" + PANEL_NAME);
if (!div) {
    div = document.createElement("div");
    div.id = PANEL_NAME;
    div.style.position = "fixed";
    div.style.zIndex = 10000;
    div.style.top = "0";
    div.style.left = "0";
    document.body.appendChild(div);
}
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    div
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// // load
// (p=>{document.createElement("script");s.src = p; document.body.appendChild(s)})('http://localhost:3001/')
// const s = document.createElement("script");
// s.src = "http://localhost:3001/";
// document.body.appendChild(s);
