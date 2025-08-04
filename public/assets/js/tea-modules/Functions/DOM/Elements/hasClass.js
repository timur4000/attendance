/**
 * @function
 *
 * @description Determines whether the specified class token contains in the specified element.
 *
 * @param { HTMLElement } element
 *
 * @param { string } token
 *
 * @return { boolean }
 **/
export function hasClass(element, token)
{
    return element.classList.contains(token);
}
