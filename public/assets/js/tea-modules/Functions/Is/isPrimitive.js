import { isString } from './isString.js';
import { isNumber } from './isNumber.js';
import { isBoolean } from './isBoolean.js';
import { isSymbol } from './isSymbol.js';
import { isUndefined } from './isUndefined.js';
import { isNull } from './isNull.js';


/**
 * @function
 *
 * @description Checks if the given argument is a primitive type.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isPrimitive(verifiable)
{
    return (
        isNull(verifiable) ||
        isString(verifiable) ||
        isNumber(verifiable) ||
        isBoolean(verifiable) ||
        isSymbol(verifiable) ||
        isUndefined(verifiable)
    );
}