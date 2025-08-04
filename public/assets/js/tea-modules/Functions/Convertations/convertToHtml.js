import { createElement } from '../DOM/Elements/createElement.js';


/**
 * @function
 *
 * @description Converts a value to a html.
 *
 * @param { any } value - The value to convert.
 *
 * @return { Element } The html representation of the value.
 **/
export function convertToHtml(value)
{
    const template = createElement('template');
    
    value.trim();

    template.innerHTML = value;
    
    return template.content.firstElementChild;
}
