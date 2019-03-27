import assert from "assert";

import {
    JSONArray,
    JSONObject,
} from "./json";

import { AppleNews } from "./apple-news";
import { articleMetadataFromOpts } from "./article-metadata-from-opts";

/**
 *
 * @param {JSONArray} article - The parsed article object.
 * @param {JSONObject} bundleFiles - The object containing file names and locations for any files to be included.
 * @param {JSONArray} metadata - The metadata object, if applicable.
 * @returns {JSONArray} Prepared upload form data.
 */
export function createArticleUploadFormData(
    article: JSONArray,
    bundleFiles?: JSONObject,
    metadata?: AppleNews.IncomingOptions,
) : JSONArray {

    assert(typeof article !== "undefined", "Article JSON must be passed as an argument.");

    const files: any = bundleFiles || {};

    assert(typeof files["article.json"] === "undefined", "Bundle cannot contain `article.json`");
    assert(typeof files["metadata"] === "undefined", "Bundle cannot contain metadata file.");

    const meta: AppleNews.Metadata | object = articleMetadataFromOpts(metadata);

    const articleJson: string = JSON.stringify(article);
    const metadataJson: string = JSON.stringify({ data: meta });

    const result: JSONArray = [
        {
            name: "article.json",
            filename: "article.json",
            value: articleJson,
            options: {
                filename: "article.json",
                contentType: "application/json",
            },
        },
        {
            name: "metadata",
            value: metadataJson,
            options: {
                filename: "metadata",
                contentType: "application/json",
            },
        },
    ];

    Object.keys(files).forEach(
        (name: string, index: number) : void => {

            result.push({
                filename: name,
                name: `file${index}`,
                value: files[name],
                options: {
                    filename: name,
                },
            });
        },
    );

    return result;
}
