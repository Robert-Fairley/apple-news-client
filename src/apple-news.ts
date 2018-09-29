/**
 * Collection of types and other items that need to be isolated to the Apple News environment.
 * @namespace AppleNews
 */
export namespace AppleNews {

    /**
     * @type {Metadata} - Apple News article metadata object
     */
    export type Metadata = {

        /**
         * @property {string} accessoryText - Text to include below the article excerpt in the channel view, such
         * as a byline or category label.
         * @default "metadata.authors"
         */
        accessoryText?: string,

        /**
         * @property {string} isCandidateToBeFeatured - Indicates whether or not this article should be considered
         * for featuring in News
         * @default false
         */
        isCandidateToBeFeatured?: boolean,

        /**
         * @property {boolean} isHidden - Indicates whether or not the article should be temporarily hidden from
         * display in the News feed.
         * @default false
         */
        isHidden?: boolean,

        /**
         * @property {boolean} isPreview - Indicates whether this article should be public (live) or should
         * be a preview that is only visible to members of your channel.
         * Set isPreview to false to publish the article right away and make it visible to all News users.
         * If your channel has not yet been approved to publish articles
         * in Apple News Format, setting isPreview to false will result in an ONLY_PREVIEW_ALLOWED error.
         * Default value: true if your channel has not yet been approved to publish articles in Apple News
         * Format; false if your channel has been approved.
         * @default true
         */
        isPreview?: boolean,

        /**
         * @property {boolean} isSponsored - Indicates whether this article consists of sponsored content
         * for promotional purposes. Sponsored content must be marked as such;
         * channels that do not follow this policy may be suspended. When using isSponsored, if you do not
         * want the sponsored article to appear in your channel’s feed,
         * set sections to [] (an empty array).
         * @default false
         */
        isSponsored?: boolean,

        /**
         * @property {string} maturityRating - Indicates the viewing audience for the content. Note that a
         * MATURE rating indicates explicit
         * content that is only appropriate for a specific audience.
         * @default null
         */
        maturityRating?: "KIDS" | "MATURE" | "GENERAL";

        /**
         * @property {string} revision - The current revision token for the article. The value of this field
         * must match the latest revision from an earlier Create, Read,
         * or Update Article call. This field prevents multiple users from updating an article simultaneously,
         * which would result in data loss.
         */
        revision?: string;

        /**
         * @property {any} links - Associated sections.
         * @todo Improve the documentation on this field.
         */
        links?: any;
    };

    /**
     * Configuration type. Contains the API Key Id and Secret
     * required for interacting with the Apple News API.
     * @type {APIConfig}
     */
    export type APIConfig = {
        apiId: string,
        apiSecret: string,
        port?: string | number,
    };
}
