import { isArray } from './isArray.js';
import { isObject } from './isObject.js';


/**
 * @function
 *
 * @description Checks if the given argument is a structure.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isStructure(verifiable)
{
    return isArray(verifiable) || isObject(verifiable);
}
