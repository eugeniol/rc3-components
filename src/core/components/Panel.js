import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import {
    Card,
    CardImg,
    Img,
    CardBlock,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardText,
    Button,
    Collapse,
} from "@bootstrap-styled/v4";

const Noop = ({ children }) => <>{children}</>;

export const Panel = ({ header, children, style, draggable }) => {
    const [isOpen, setIsOpen] = useState(true);
    const Tag = draggable ? Draggable : Noop;
    return (
        <Tag
            handle=".drag-handler:first-child"
            defaultPosition={{ x: 5, y: 5 }}
        >
            <Card style={style} inverse={true}>
                <CardHeader className={draggable ? "drag-handler" : ""}>
                    {header}
                    <Button
                        color="default"
                        size="sm"
                        style={{ float: "right" }}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ↨
                    </Button>
                </CardHeader>
                <Collapse isOpen={isOpen}>{children}</Collapse>
            </Card>
        </Tag>
    );
};

export const Slice = ({ header, children, style, draggable }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <Card style={style} theme={{ "$card-border-radius": 0 }}>
            <CardHeader className={draggable ? "drag-handler" : ""}>
                {header}
                <Button
                    color="default"
                    size="sm"
                    style={{ float: "right" }}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ↨
                </Button>
            </CardHeader>
            <Collapse isOpen={isOpen}>
                <CardBlock>{children}</CardBlock>
            </Collapse>
        </Card>
    );
};
