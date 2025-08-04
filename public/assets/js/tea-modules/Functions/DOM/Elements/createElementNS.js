import { isArray } from '../../Is/isArray.js';


/**
 * @function
 *
 * @description Creates namespace html element by given arguments.
 *
 * @param { string  } tag
 *
 * @param { Object<string, string | string[]> } attributes
 *
 * @param { Element[] | string[] } nodes
 *
 * @param { string | null } [namespace=http://www.w3.org/2000/svg]
 *
 * @return { HTMLElementTagNameMap[string] }
 **/
export function createElementNS(tag, attributes = {}, nodes = [], namespace = 'http://www.w3.org/2000/svg')
{
    const element = document.createElementNS(namespace, tag);
    
    for (const key in attributes)
    {
        let value = attributes[key];
        
        if (isArray(value))
        {
            value = value.join(' ');
        }
        
        element.setAttribute(key, value);
    }

    nodes.forEach(node =>
    {
        element.append(node);
    });
    
    return element;
}
