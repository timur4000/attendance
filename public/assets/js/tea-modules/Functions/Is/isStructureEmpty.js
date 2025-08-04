import { isArray } from './isArray.js';
import { isObject } from './isObject.js';


/**
 * @function
 *
 * @description Checks if the given structure is an empty.
 *
 * @param { Array | Object } verifiable
 *
 * @return { boolean }
 **/
export function isStructureEmpty(verifiable)
{
    return !(isArray(verifiable) && !!verifiable.length) && !(isObject(verifiable) && !!Object.keys(verifiable).length);
}
