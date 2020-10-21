import { useEffect, useState } from "react";

import get from "lodash/get";

import memoize from "lodash/memoize";
import { resolveStaticServerUrl } from "core/static-utils";

const { createInlineSchema } = require("@ordergroove/schemas/lib/utils");
const rootSchema = require("@ordergroove/schemas");

export const getSchemaForVersion = memoize(async function (libraryAndVersion) {
    const apiEndpoint = resolveStaticServerUrl(
        `${libraryAndVersion}/schema.json`
    );
    return fetch(apiEndpoint, {
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
    })
        .then((res) => res.json())
        .then((offerSchema) => createInlineSchema(rootSchema, offerSchema));
});

export function getDefinition(rawSchema, definitionKey) {
    return {
        ...rawSchema,
        ...get(rawSchema, ["definitions", definitionKey], {
            type: "object",
        }),
    };
}
export function useExternalSchema(library, version, definitionKey) {
    const [schema, setSchema] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchSchema() {
            setIsLoading(true);
            try {
                const rawSchema = await getSchemaForVersion(
                    `${library}/${version}`
                );

                setSchema(rawSchema);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSchema();
    }, [library, version]);
    return { schema, isLoading, error };
}
