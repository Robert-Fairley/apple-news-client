import { AppleNews } from "./apple-news";

/**
 * Generate the compliant metadata object for an Apple News article from the
 * options passed to the relevant function.
 * @param {any} options
 * @returns {AppleNews.Metadata} The metadata object to be included in the request.
 */
export function articleMetadataFromOpts(
    options?: AppleNews.IncomingOptions,
) : AppleNews.Metadata | object {

    if (!options)
        return {};

    let isPreview;

    if (typeof options.isPreview !== "undefined")
        isPreview = options.isPreview.toString() === "false" ? false : true;
    else
        isPreview = true;

    /***
     * Object that will be returned
     */
    const metadataObject: AppleNews.Metadata  = {
        isPreview,
        isIssueOnly: !!options.isIssueOnly,
        isCandidateToBeFeatured: !!options.isCandidateToBeFeatured,
        isHidden: !!options.isHidden,
        isSponsored: !!options.isSponsored,
    };

    if (!!options.accessoryText && options.accessoryText.length > 0) {
        metadataObject.accessoryText = options.accessoryText;
    }

    if (!!options.sections && options.sections.length > 0) {
        metadataObject.links = { sections: options.sections };
    }

    if (!!options.maturityRating) {
        metadataObject.maturityRating = options.maturityRating;
    }

    return metadataObject;
}
