/**
 * @function
 *
 * @description Checks if the given element contains the specified attribute.
 *
 * @param { HTMLElement } element
 *
 * @param { string } qualifiedName
 *
 * @return { boolean }
 **/
export function hasAttribute(element, qualifiedName)
{
    return element.hasAttribute(qualifiedName);
}
