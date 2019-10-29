/******************************************************************
 * 
 *                  Apple News API Client
 *                                   For NodeJS
 * 
 * A rewrite in TypeScript as well as including support for
 * files on the local filesystem versus remotely hosted or locally
 * served.
 * 
 *  Based on the gracious work by the `micnews` team.
 * 
 * Original repository {@link https://github.com/micnews/apple-news}
 * 
 * @version 0.5
 * @license MIT
 * @copyright 2018 Robert Fairley
 * @author Robert Fairley <rrafairley@gmail.com>
 * 
 *****************************************************************/
const AppleNewsClient = require("./lib").default;

module.exports = {
    default: AppleNewsClient,
    AppleNewsClient
};
