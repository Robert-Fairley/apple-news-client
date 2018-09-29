/**
 * @type {JSONValue} - A valid JSON value primitive
 */
export type JSONPrimitive = string | number | boolean | null;
/**
 * @type {JSONValue} - A valid JSON member value
 */
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
/**
 * @type {JSONObject} - A JSON object that's been parsed into JavaScript
 */
export type JSONObject = { [member: string]: JSONValue };
/**
 * @interface JSONArray - An array containing valid, parsed JSON values.
 */
export interface JSONArray extends Array<JSONValue> {}
