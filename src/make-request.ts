import { createHmac } from "crypto";
import { ClientRequest, IncomingMessage } from "http";
import * as https from "https";
import { AppleNews } from "./apple-news";
import { DEFAULT_HOST } from "./constants";
import { formatDate } from "./date";
import { encodeFormData, MaybeError } from "./encode-form-data";

/**
 * Callback function for the make request function.
 * @type {MakeRequestCallback}
 */
export type MakeRequestCallback = (...args: any[]) => any;
/**
 * Expressed by {@link MakeRequestCallback}
 * @type {SendRequestCallback}
 */
export type SendRequestCallback = MakeRequestCallback;

/**
 * Sets up a request conditional on the method type.
 * @param {AppleNews.APIConfig} config
 * @returns {Function} The {@link makeRequest} method.
 */
export function setupMakeRequest(
    config: AppleNews.APIConfig,
) : (...args: any[]) => any {

    /**
     * Sets up and sends the actual request itself, conforming to
     * Apple News APIs security model for interacting with the API.
     * @param {string} method
     * @param {string} endpoint
     * @param {any} post
     * @param {SendRequestCallback} cb
     * @returns {void}
     */
    function sendRequest(
        method: string,
        endpoint: string,
        post?: any,
        cb?: (...args: any[]) => any,
    ) : void {

        const host: string = DEFAULT_HOST;
        const date: string = formatDate(new Date());

        let canonicalRequest: any = Buffer.from(
            method + "https://" + host + endpoint + date +
            (post ? post.headers["content-type"] : ""),
            "ascii",
        );

        if (post) {
            canonicalRequest = Buffer.concat([canonicalRequest, post.buffer]);
        }

        // FINISH
        const key: Buffer = Buffer.from(config.apiSecret, "base64");

        const signature: string = createHmac("sha256", key)
            .update(canonicalRequest, "utf8")
            .digest("base64");

        const auth: string = "HHMAC; key=\"" + config.apiId +
            "\"; signature=\"" + signature +
            "\"; date=\"" + date + "\"";

        const req: ClientRequest = https.request({
            method,
            host,
            port: config.port || void 0,
            rejectUnauthorized: process.env.NODE_ENV !== "test",
            path: endpoint,
            headers: {
                Accept: "application/json",
                Authorization: auth,
                ...(post ? post.headers : {}),
            },
        });

        req.on("response", (res: IncomingMessage) => {

            let result: string = '';
            let done: boolean = false;

            res.on("data", (chunk: any) => {
                result += chunk.toString();
            });

            res.on("error", (error: Error) => {
                if (!done) {
                    done = true;
                    cb && cb(error);
                }
            });

            res.on("end", () => {

                if (!done) {
                    done = true;
                    let parsed = null;

                    if (!result) {
                        return cb && cb(null, res, null);
                    }

                    try {
                        parsed = JSON.parse(result);
                    } catch (e) {
                        return cb && cb(e);
                    }

                    if (parsed.data) {
                        return cb && cb(null, res, parsed.data);
                    }

                    if (parsed.errors &&
                        Array.isArray(parsed.errors) &&
                        parsed.errors.length > 0 &&
                        parsed.errors[0].code) {

                            const e: any = new Error(result);

                            e.apiError = parsed.errors[0];

                            return cb && cb(e);
                    }

                    return cb && cb(new Error(result));
                }
            });
        });

        if (post) {
            req.write(post.buffer);
        }

        req.end();
    }

    /**
     * Function called by any one of the client methods to
     * make any calls to the API to read channels or sections or
     * create articles. Relies on the method type and the presence
     * of request options/article data to determine how to send the
     * request itself.
     * @param {string} method
     * @param {endpoint} string
     * @param {any} requestOptions
     * @param {MakeRequestCallback} cb
     * @returns {unknown}
     */
    return function makeRequest(
        method: string,
        endpoint: string,
        requestOptions?: any,
        cb?: MakeRequestCallback,
    ) : any {

        /**
         * Function called when the request is complete. Calls the {@link sendRequest}
         * local encapsulated function to complete the API interaction.
         * @param {Error} err
         * @param {any} res
         * @param {any} body
         */
        const done = (
            err?: Error,
            res?: any,
            body?: any,
        ) : unknown => {

            if (err) {
                return cb && cb(err);
            }

            if (res.statusCode < 200 && res.statusCode >= 300) {
                return cb && cb(
                    new Error(`${method} ${endpoint} Code: ${res.statusCode}`));
            }

            return cb && cb(null, body);
        };

        if (method === "POST" && requestOptions.formData) {
            return encodeFormData(
                requestOptions.formData || {},
                (error: MaybeError, encoded: any) => {

                    if (error) {
                        return done(error);
                    }

                    sendRequest(method, endpoint, encoded, done);
                },
            );
        }

        sendRequest(method, endpoint, null, done);
    };
}
