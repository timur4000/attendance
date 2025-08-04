import { prefix } from '../../Strings/prefix.js';


/**
 * @function
 *
 * @description Removes the attribute of the specified element by the specified qualified name.
 *
 * @param { HTMLElement } element
 *
 * @param { string } qualifiedName
 *
 * @param { boolean ? } isDataAttribute
 *
 * @return { void }
 **/
export function removeAttribute(element, qualifiedName, isDataAttribute = false)
{
    qualifiedName = prefix(qualifiedName, 'data-', isDataAttribute);
    
    element.removeAttribute(qualifiedName);
}
