/**
 * @function
 *
 * @description Sets the given value of an attribute to the given element.
 *
 * @param { HTMLElement } element
 *
 * @param { string } qualifiedName
 *
 * @param { string } value
 *
 * @return { void }
 **/
export function setAttribute(element, qualifiedName, value)
{
    element.setAttribute(qualifiedName, value);
}
