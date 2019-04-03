import { AppleNews } from "./apple-news";
import { METADATA_DEFAULT } from "./constants";

/**
 * Generate the compliant metadata object for an Apple News article from the
 * options passed to the relevant function.
 * @param {any} options
 * @returns {AppleNews.Metadata} The metadata object to be included in the request.
 */
export function articleMetadataFromOpts(
    options?: AppleNews.IncomingOptions,
) : AppleNews.Metadata | object {

    if (!options || options === undefined)
        return {};

    /***
     * Object that will be returned
     */
    const metadataObject: AppleNews.Metadata = {};

    options.isPreview === undefined
        ? metadataObject.isPreview = METADATA_DEFAULT.IS_PREVIEW
        : metadataObject.isPreview = options.isPreview;

    options.isIssueOnly === undefined
        ? metadataObject.isIssueOnly = METADATA_DEFAULT.IS_ISSUE_ONLY
        : metadataObject.isIssueOnly = options.isIssueOnly;

    options.isPaid === undefined
        ? metadataObject.isPaid = false
        : metadataObject.isPaid = options.isPaid;

    options.isCandidateToBeFeatured === undefined
        ? metadataObject.isCandidateToBeFeatured = METADATA_DEFAULT.IS_CANDIDATE_TO_BE_FEATURED
        : metadataObject.isCandidateToBeFeatured = options.isCandidateToBeFeatured;

    options.isHidden === undefined
        ? metadataObject.isHidden = METADATA_DEFAULT.IS_HIDDEN
        : metadataObject.isHidden = options.isHidden;

    options.isSponsored === undefined
        ? metadataObject.isSponsored = METADATA_DEFAULT.IS_SPONSORED
        : metadataObject.isSponsored = options.isSponsored;

    options.maturityRating === undefined
        ? METADATA_DEFAULT.MATURITY_RATING
        : metadataObject.maturityRating = options.maturityRating;

    if (!!options.accessoryText && options.accessoryText.length > 0) {
        metadataObject.accessoryText = options.accessoryText;
    }

    if (!!options.sections && options.sections.length > 0) {
        metadataObject.links = { sections: options.sections };
    }

    if (!!options.links && Object.keys(options.links).length > 0) {
        metadataObject.links = {...options.links};
    }

    return metadataObject;
}
