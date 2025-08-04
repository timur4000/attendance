import { isArray } from '../../Is/isArray.js';
import { isString } from '../../Is/isString.js';
import { isEmpty } from '../../Is/isEmpty.js';


/**
 * @function
 *
 * @description Creates html element by given arguments.
 *
 * @param { string } tag
 *
 * @param { Object<string, string | string[]> } attributes
 *
 * @param { Element[] | string[] | Text[] } nodes
 *
 * @return { HTMLElementTagNameMap[string] }
 **/
export function createElement(tag, attributes = {}, nodes = [])
{
    const element = document.createElement(tag);
    
    for (const key in attributes)
    {
        let value = attributes[key];
        
        if (isArray(value))
        {
            value = value.join(' ');
        }
        
        element.setAttribute(key, value);
    }
    
    for (const key in nodes)
    {
        let node = nodes[key];
        
        if (isEmpty(node))
        {
            continue ;
        }
        
        if (isString(node))
        {
            node = document.createTextNode(node);
        }
        
        element.append(node);
    }
    
    return element;
}
