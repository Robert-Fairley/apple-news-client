import fileType from "file-type";
import FormData from "form-data";
import * as fs from "fs";
import * as stream from "stream";

import {
    CRLF,
    validContentTypes,
} from "./constants";

import {
    JSONArray,
    JSONValue,
} from "./json";

/**
 * Callback function parameters for encodeFormData function.
 * @type {EncodeFormDataCallback}
 */
export type EncodeFormDataCallback = (...args: any[]) => any;

/**
 * Object passed to callback function in encodeFormData
 * returning the post's items as a buffer.
 * @type {EncodedFormData}
 */
export type EncodedFormData = {
    headers: { [member: string]: string },
    buffer: Buffer,
};

/**
 * Generates the correct FormData header and appends the relevant FormData entry
 * for the item provided.
 * @param {FormData} form
 * @param {JSONObject} item
 * @param {any} data
 * @param {string} contentType
 * @returns {void}
 */
function append(
    form: FormData,
    item: any,
    data: any,
    contentType: string,
) : void {

    const options: JSONValue = item.options;

    const length: number = typeof data === "string" ? Buffer.byteLength(data) : data.length;

    const header: string = "--" + form.getBoundary() + CRLF +
        "Content-Type: " + contentType + CRLF +
        "Content-Disposition: form-data" +
        (item.filename ? "; filename=" + encodeURIComponent((<any> options).filename) : "") +
        (item.name ? "; name=" + encodeURIComponent(<any> item.name) : "") +
        "; size=" + length + CRLF + CRLF;

    form.append(
        <string> (item.name || item.filename),
        data,
        {
            header,
            knownLength: length,
            ...<object> options,
        },
    );
}

/**
 * Encodes items and files as valid form data in preparation for sending to Apple News.
 * @param {JSONArray} formData
 * @param {EncodeFormDataCallback} cb
 * @returns {unknown}
 *
 * @todo Make compatible with both hosted files and local file system files. Presently only supports local fs files.
 */
export function encodeFormData(
    formData: JSONArray,
    cb: EncodeFormDataCallback,
) : void {

    const fd: FormData = new FormData();

    formData.forEach(
        (item: JSONValue) => {

            const value: any = (<any> item).value;
            const options: any = (<any> item).options;

            if (options.contentType === "application/json") {
                append(fd, item, value, "application/json");
            } else {

                const data: Buffer = fs.readFileSync(value);

                if (!data) {
                    return cb(new Error("File not found: " + value));
                }

                const contentObject = fileType(data);

                if (!contentObject) {
                    return cb(new Error("Filetype error: " + value));
                }

                let contentType = contentObject.mime;
                if (validContentTypes.indexOf(contentType) === -1) {
                    contentType = validContentTypes[0];
                }

                append(fd, item, data, contentType);
            }
        },
    );

    const converter: stream.Writable = new stream
    .Writable();
    const chunks: any[] = [];

    converter._write = (chunk: any, enc: string, callback: any) => {

        chunks.push(chunk);
        callback();
    };

    converter.on("finish", () => {

        const resultObject: EncodedFormData = {
            buffer: Buffer.concat(chunks),
            headers: fd.getHeaders(),
        };

        return cb(null, resultObject);
    });

    fd.pipe(converter);

}
