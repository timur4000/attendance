import { isObject } from './isObject.js';


/**
 * @function
 *
 * @description Checks if the provided object contains a cyclic reference.
 *
 * @param { Object } verifiable
 *
 * @param { Set } objects
 *
 * @return { boolean }
 **/
export function isCyclic(verifiable, objects = new Set())
{
    if (!isObject(verifiable))
    {
        return false;
    }

    if (objects.has(verifiable))
    {
        return true;
    }

    objects.add(verifiable);

    for (const key in verifiable)
    {
        const value = verifiable[ key ];

        if (isCyclic(value, objects))
        {
            return true;
        }
    }

    objects.delete(verifiable);

    return false;
}
