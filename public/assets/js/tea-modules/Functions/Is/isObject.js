import { isArray }      from './isArray.js';
import { isCollection } from './isCollection.js';


/**
 * @function
 *
 * @description Checks if the given argument is object.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isObject(verifiable)
{
    return (
        verifiable !== null &&
        typeof verifiable === 'object' &&
        !isArray(verifiable) &&
        !isCollection(verifiable));
}
