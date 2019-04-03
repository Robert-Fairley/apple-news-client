import { AppleNews } from "./apple-news";

/**
 * Default Apple News host. There's not much reason another might be
 * used, but the option is presented anyway.
 * @constant {string} DEFAULT_HOST
 */
export const DEFAULT_HOST: string = "news-api.apple.com";
/**
 * Windows style line break. (Return/Newline)
 * @constant {string} CRLF
 */
export const CRLF: string = "\r\n";

/**
 * Content types allowed by Apple News for binary includes.
 * @constant {string[]} validContentTypes
 */
export const validContentTypes: string[] = [
    "application/octet-stream",
    "image/jpeg",
    "image/png",
    "image/gif",
];

/**
 * Default values for options that were not passed explicitly
 * with any other metadata options.
 * @constant {AppleNews.Metadata} METADATA_DEFAULT
 */
export const METADATA_DEFAULT: AppleNews.Metadata = {
    IS_PREVIEW: true,
    IS_ISSUE_ONLY: false,
    IS_PAID: false,
    IS_CANDIDATE_TO_BE_FEATURED: false,
    IS_HIDDEN: false,
    IS_SPONSORED: false,
    MATURITY_RATING: null,
    ACCESSORY_TEXT: null,
    REVISION: null,
    LINKS: null,
};
