import assert from "assert";

import { AppleNews } from "./apple-news";

/**
 * Generate the compliant metadata object for an Apple News article from the
 * options passed to the relevant function.
 * @param {any} options
 * @returns {AppleNews.Metadata} The metadata object to be included in the request.
 */
export function articleMetadataFromOpts(
    options: any,
) : AppleNews.Metadata {
    assert(typeof options.isPreview === "undefined" || typeof options.isPreview === "boolean");
    assert(typeof options.isSponsored === "undefined" || typeof options.isSponsored === "boolean");
    assert(typeof options.maturityRating === "undefined" || typeof options.maturityRating === "string");

    /***
     * Object that will be returned
     */
    const metadataObject: AppleNews.Metadata  = {
        isPreview: typeof options.isPreview === "boolean" ? options.isPreview : true,
        isIssueOnly: typeof options.isIssueOnly === "boolean" ? options.isIssueOnly : false,
        isSponsored: !!options.isSponsored,
    };

    if (options.sections && options.sections.length > 0) {
        metadataObject.links = { sections: options.sections };
    }

    if (options.maturityRating) {
        metadataObject.maturityRating = options.maturityRating;
    }

    return metadataObject;
}
