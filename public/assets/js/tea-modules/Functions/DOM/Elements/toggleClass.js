import { isNull }      from '../../Is/isNull.js';


/**
 * @function
 *
 * @description Toggles the specified class to specified element.
 *
 * @param { HTMLElement } element
 *
 * @param { string } token
 *
 * @param { ? boolean } force
 *
 * @return { boolean }
 **/
export function toggleClass(element, token, force = null)
{
    return element.classList.toggle(token, !isNull(force) ? force : undefined);
}
