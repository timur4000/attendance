import { prefix } from '../../Strings/prefix.js';


/**
 * @function
 *
 * @description Gets attribute value of given element.
 *
 * @param { HTMLElement } element - The element within which to search.
 *
 * @param { string } qualifiedName - The qualified name of attribute.
 *
 * @param { boolean ? } [isDataAttribute = false] - If equal to 'true' adds 'data-' before attribute name.
 *
 * @param { boolean ? } [isAfterRemove = false] - If equal to 'true' the attribute is removed after performed.
 *
 * @return { string | null } The value of the attribute, or null if the attribute is not found.
 **/
export function getAttribute(element, qualifiedName, { isDataAttribute = false, isAfterRemove = false } = {})
{
    qualifiedName = prefix(qualifiedName, 'data-', isDataAttribute);
    
    const attribute = element.getAttribute(qualifiedName);
    
    if (isAfterRemove)
    {
        element.removeAttribute(qualifiedName);
    }
    
    return attribute;
}