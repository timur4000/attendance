import { createElementNS } from './createElementNS.js';


/**
 * @function
 *
 * @description Creates svg element.
 *
 * @param { string } id
 *
 * @param { Object<string, string | string[]> } attributes
 *
 * @return { SVGElement }
 **/
export function createSvgElement(id, attributes = {})
{
    const use = createElementNS('use', { href: '/assets/icons/sprite.svg#' + id });
    
    return createElementNS('svg', attributes, [ use ]);
}
