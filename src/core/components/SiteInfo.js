import React from "react";

function rankRules(rule) {
    return Object.entries(
        Array.from(document.querySelectorAll("*"))
            .map((it) => window.getComputedStyle(it)[rule])
            .reduce((acc, cur) => ({ ...acc, [cur]: (acc[cur] || 0) + 1 }), {})
    )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
}
const ColorThumb = ({ value, times }) => (
    <span
        style={{
            backgroundColor: value,
            width: "32px",
            height: "32px",
            display: "inline-block",
            border: "3px inset",
        }}
    />
);
const FontFamily = ({ value, times }) => (
    <div
        style={{
            border: "3px inset",
            padding: "3px",
            fontFamily: value,
            fontSize: "16px",
        }}
    >
        {value}
    </div>
);
const FontSize = ({ value }) => (
    <div
        style={{
            border: "3px inset",
            padding: "3px",
            fontSize: value,
        }}
    >
        {value}
    </div>
);
const RankWrapper = ({ rule, Component }) => {
    return (
        <>
            {rankRules(rule).map(([value, times]) => (
                <span title={`times used ${times}`}>
                    <Component key={value} value={value} />
                </span>
            ))}
        </>
    );
};

export const SiteInfo = () => {
    return (
        <dl>
            <dt>Font Color</dt>
            <dd>
                <RankWrapper rule="color" Component={ColorThumb} />
            </dd>
            <dt>Font Family</dt>
            <dd>
                <RankWrapper rule="font-family" Component={FontFamily} />
            </dd>
            <dt>Font Sizes</dt>
            <dd>
                <RankWrapper rule="font-size" Component={FontSize} />
            </dd>
        </dl>
    );
};
