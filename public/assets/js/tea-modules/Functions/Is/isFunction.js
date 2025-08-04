import { isClass } from './isClass.js';


/**
 * @function
 *
 * @description Checks if the given argument is a function.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isFunction(verifiable)
{
    return !isClass(verifiable) && typeof verifiable === 'function';
}
