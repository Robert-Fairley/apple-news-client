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
