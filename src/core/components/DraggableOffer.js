import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import InlineOfferEditor from "./InlineOfferEditor";
import { throttle } from "lodash";
import { PlaceHolder } from "./Placeholder";
import Button from "@bootstrap-styled/v4/lib/Button";

function getCssPath(ev) {
    const selector = Array.from(ev.path)
        .reverse()
        .map((it) => {
            if (!it.tagName || it.tagName === "BODY" || it.tagName === "HTML")
                return "";
            return (
                (it.id ? "#" + it.id : it.tagName.toLowerCase()) +
                Array.from(it.classList)
                    .map((c) => `.${c}`)
                    .join("")
            );
        })
        .join(" ")
        .trim();
}

export const DraggableOffer = ({ onSelector }) => {
    const ref = useRef();
    let placeholder;

    const placeIt = throttle((ev) => {
        let actual = placeholder;
        if (ev.target === actual) actual = ev.target.parentNode;
        console.log(ev);
        const targetRects = ev.target.getBoundingClientRect();
        const midX = (targetRects.left + targetRects.width) / 2;
        const midY = (targetRects.top + targetRects.height) / 2;
        const { pageX, pageY } = ev;
        actual.remove();
        if (pageX < midX || pageY < midY) {
            ev.target.insertBefore(actual, ev.target.firstChild);
        } else {
            ev.target.appendChild(actual);
        }
        onSelector && onSelector(getCssPath(ev));
    }, 500);

    function isAllowedTarget(ev) {
        if (ev.target === placeholder) return;
        if (
            Array.from(ev.path).find(
                (it) =>
                    it === placeholder ||
                    (it && it.tagName && it.tagName.startsWith("OG-"))
            )
        )
            return;
        return (
            ev.target.matches("div,p") &&
            !ev.target.matches("#rc3-inline-editor,#rc3-inline-editor *")
        );
    }

    function handleDragEnter(ev) {
        if (isAllowedTarget(ev))
            ev.target.style.boxShadow = "0 0 2px 3px rgba(0,0,255,.5)";
    }
    function handleDragOver(ev) {
        if (isAllowedTarget(ev)) placeIt(ev, placeholder);
    }

    function handleDragLeave(ev) {
        if (isAllowedTarget(ev)) ev.target.style.boxShadow = "none";
    }
    function handleOnDrop(ev) {}

    function handleDragStart(ev) {
        const container = document.createElement("span");
        placeholder = container;
        function handleDelete() {
            container.remove();
        }
        ReactDOM.render(<DragCursor />, container);
        document.body.addEventListener("dragenter", handleDragEnter);
        document.body.addEventListener("dragover", handleDragOver);
        document.body.addEventListener("dragleave", handleDragLeave);
        document.body.addEventListener("drop", handleDragOver);
        ReactDOM.render(
            <InlineOfferEditor onDelete={handleDelete} />,
            container
        );
    }

    function handleDragEnd(ev) {
        document.body.removeEventListener("dragenter", handleDragEnter);
        document.body.removeEventListener("dragover", handleDragOver);
        document.body.removeEventListener("dragleave", handleDragLeave);
        document.body.removeEventListener("drop", handleDragOver);
    }

    return (
        <Button
            className="mx-2"
            color="success"
            ref={ref}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggable="true"
            // style={{ border: "1px solid red", padding: "5px" }}
        >
            <PlaceHolder />
        </Button>
    );
};

const DragCursor = (props) => (
    <div
        style={{
            border: "2px solid green",
            background: "green",
            display: "block",
            margin: "10px",
        }}
    />
);
