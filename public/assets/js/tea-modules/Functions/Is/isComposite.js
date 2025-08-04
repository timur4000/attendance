import { isArray } from './isArray.js';
import { isObject } from './isObject.js';
import { isClass } from './isClass.js';
import { isCollection } from './isCollection.js';


/**
 * @function
 *
 * @description Checks if the given argument is a composite.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isComposite(verifiable)
{
    return (
        isArray(verifiable)
        || isObject(verifiable)
        || isClass(verifiable)
        || isCollection(verifiable)
    );
}
