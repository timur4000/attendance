import { isNodeList }    from '../../Is/isNodeList.js';
import { isElement }     from '../../Is/isElement.js';


/**
 * @function
 *
 * @description Searches element(s) by given selectors.
 *
 * @template T
 *
 * @param { string | Element } selectors
 *
 * @param { Boolean } [isAll = false] - If true will search for all elements.
 *
 * @param { Element } [root = document.documentElement] - The element in which to search.
 *
 // * @return { T | Element | NodeListOf<Element> } The found element(s).
 **/
export function querySelector(selectors, { isAll = false, root = document.documentElement } = {})
{
    if (isElement(selectors) || isNodeList(selectors))
    {
        return selectors;
    }
    
    return isAll ? root.querySelectorAll(selectors) : root.querySelector(selectors);
}
