/**
 * @function
 *
 * @description Checks if a property is an own property of an object.
 *
 * @param { Object } target -The object to check.
 *
 * @param { string } property -The property to check.
 *
 * @return { boolean }
 **/
export function isOwnProperty(target, property)
{
    return target.hasOwnProperty(property);
}
