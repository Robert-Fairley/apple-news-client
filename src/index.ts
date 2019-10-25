import assert from "assert";

import { AppleNews } from "./apple-news";

import { articleMetadataFromOpts } from "./article-metadata-from-opts";
import { createArticleUploadFormData } from "./create-article-upload-form-data";
import { setupMakeRequest } from "./make-request";

/**
 * Callback function
 * @type {ClientRequestCallback}
 */
export type ClientRequestCallback = (...args: any[]) => any;

/**
 * The Apple News Client class. Exposing an instance of the client
 * is necessary for accessing the various request types.
 */
export class AppleNewsClient {
    /**
     * @property {string} apiId - The Apple News API Key Id.
     * @private
     */
    private apiId: string;
    /**
     * @property {string} apiSecret - The Apple News API Secret
     * @private
     */
    private apiSecret: string;
    /**
     * @property {Function} makeRequest - The makeRequest function exposed by {@link setupMakeRequest}
     * @private
     */
    private makeRequest: (...args: any[]) => any;

    /**
     * @constructor
     * @param {AppleNews.APIConfig} config - Configuration settings.
     */
    constructor(config: AppleNews.APIConfig) {
        assert(typeof config.apiId === "string", "config.apiId: API ID is required");
        assert(typeof config.apiSecret === "string", "config.apiSecret: API secret is required.");

        this.apiId = config.apiId;
        this.apiSecret = config.apiSecret;
        this.makeRequest = setupMakeRequest(config);
    }

    /**
     * Get details about your channel including name, corresponding website, and default section.
     * @param {any} options
     * @param {ClientRequestCallback} callback
     * @returns {void}
     * @public
     */
    public readChannel(
        options: any,
        callback: ClientRequestCallback,
    ) : void {

        assert(Object(options) === options, "Options Required");
        assert(typeof callback === "function", "Callback function required");
        assert(typeof options.channelId === "string", "options.channelId required");

        const channelId = options.channelId;

        this.makeRequest(
            "GET",
            `/channels/${channelId}`,
            {},
            callback,
        );
    }

    /**
     * See a list of available sections in your channel.
     * @param {any} options
     * @param {ClientRequestCallback} callback
     * @returns {void}
     * @public
     */
    public listSections(
        options: any,
        callback: ClientRequestCallback,
    ) : void {

        assert(Object(options) === options, "Options Required");
        assert(typeof callback === "function", "Callback function required");
        assert(typeof options.channelId === "string", "options.channelId required");

        const channelId = options.channelId;

        this.makeRequest(
            "GET",
            `/channels/${channelId}/sections`,
            {},
            callback,
        );
    }

    /**
     * Get the specified section's name and channel, and learn whether it’s a default section.
     * @param {any} options
     * @param {ClientRequestCallback} callback
     * @returns {void}
     * @public
     */
    public readSection(
        options: any,
        callback: ClientRequestCallback,
    ) : void {

        assert(Object(options) === options, "Options Required");
        assert(typeof callback === "function", "Callback function required");
        assert(typeof options.sectionId === "string", "options.sectionId required");

        const sectionId = options.sectionId;

        this.makeRequest(
            "GET",
            `/sections/${sectionId}`,
            {},
            callback,
        );
    }

    /**
     * Publish an article to your channel.
     * @param {any} options
     * @param {ClientRequestCallback} callback
     * @returns {void}
     * @public
     */
    public createArticle(
        options: any,
        callback: ClientRequestCallback,
    ) : void {

        assert(Object(options) === options, "Options Required");
        assert(typeof callback === "function", "Callback function required");
        assert(typeof options.channelId === "string", "options.channelId required");
        assert(Object(options.article) === options.article, "options.article required");

        const channelId = options.channelId;
        const bundleFiles = options.bundleFiles || [];
        const meta = articleMetadataFromOpts(options);
        const fd = createArticleUploadFormData(options.article, bundleFiles, meta);

        this.makeRequest(
            "POST",
            `/channels/${channelId}/articles`,
            { formData: fd },
            callback,
        );
    }

    /**
     * Retrieve information about an article, such as the revision number, maturity rating, and so on.
     * @param {any} options
     * @param {ClientRequestCallback} callback
     * @returns {void}
     * @public
     */
    public readArticle(
        options: any,
        callback: ClientRequestCallback,
    ) : void {

        assert(Object(options) === options, "Options Required");
        assert(typeof callback === "function", "Callback function required");
        assert(typeof options.articleId === "string", "options.articleId required");

        const articleId = options.articleId;

        this.makeRequest(
            "GET",
            `/articles/${articleId}`,
            {},
            callback,
        );
    }

    /**
     * Update an existing article in your channel.
     * @param {any} options
     * @param {ClientRequestCallback} callback
     * @returns {void}
     * @public
     */
    public updateArticle(
        options: any,
        callback: ClientRequestCallback,
    ) : void {

        assert(Object(options) === options, "Options Required");
        assert(typeof callback === "function", "Callback function required");
        assert(typeof options.articleId === "string", "options.articleId required");
        assert(typeof options.revision === "string", "options.revision required");
        assert(Object(options.article) === options.article, "options.article required");

        const articleId = options.articleId;
        const bundleFiles = options.bundleFiles || {};
        const meta = <AppleNews.Metadata> articleMetadataFromOpts(options);
        meta.revision = options.revision;
        const fd = createArticleUploadFormData(options.article, bundleFiles, meta);

        this.makeRequest(
            "POST",
            `/articles/${articleId}`,
            { formData: fd },
            callback,
        );
    }

    /**
     * Delete the specified article from your channel.
     * @param {any} options
     * @param {ClientRequestCallback} callback
     * @returns {void}
     * @public
     */
    public deleteArticle(
        options: any,
        callback: ClientRequestCallback,
    ) : void {

        assert(Object(options) === options, "Options required");
        assert(typeof callback === "function", "Callback function required");
        assert(typeof options.articleId === "string", "options.articleId required");

        const articleId = options.articleId;

        this.makeRequest(
            "DELETE",
            `/articles/${articleId}`,
            {},
            callback,
        );
    }

    /**
     * See a list of all articles in a channel that match the specified search criteria.
     * @param {any} options
     * @param {ClientRequestCallback} callback
     * @returns {void}
     * @public
     */
    public searchArticles(
        options: any,
        callback: ClientRequestCallback,
    ) : void {

        assert(Object(options) === options, "Options required");
        assert(typeof callback === "function", "Callback function required");
        assert(typeof options.channelId === "string" || typeof options.sectionId === "string",
            "options.channelId or options.sectionId required");

        let queryParams = ["pageSize", "fromDate", "toDate", "sortDir"].reduce((acc, param) => {
            if (options[param]) {
                assert(["string", "number"].includes(typeof options[param]),
                    `options.${param} must be of type string or number`);
                acc += `${param}=${options[param]}&`;
            }
            return acc;
        }, '');

        queryParams = queryParams ? '?' + queryParams.slice(0, -1) : '';

        const channelId = options.channelId;
        const sectionId = options.sectionId;
        const endpoint = channelId
            ? `/channels/${channelId}/articles${queryParams}`
            : `/sections/${sectionId}/articles${queryParams}`;

        this.makeRequest(
            "GET",
            endpoint,
            {},
            callback,
        );
    }
}
