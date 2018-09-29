/**
 * Left-pads a number with `0` if it is shorter than 2 digits in length.
 * @param {number} num - Input number
 * @returns {number} Either a 0 padded number, or the original number
 */
export function pad(num: number) : string {

    let out: string = String(num);
    if (out.length === 1)
        out = '0' + out;

    return out;
}

/**
 * Formats dates in Apple News compatible ISO 8601 standard, excluding milliseconds.
 * @param {Date} currDate - A date object to be reformatted
 * @returns {string} The reformatted date string.
 */
export function formatDate(currDate: Date) : string {

    const output: Date = currDate;

    return output.getUTCFullYear()
        + '-' + pad( output.getUTCMonth() + 1 )
        + '-' + pad( output.getUTCDate() )
        + 'T' + pad( output.getUTCHours() )
        + ':' + pad( output.getUTCMinutes() )
        + ':' + pad( output.getUTCSeconds() )
        + 'Z';
}
