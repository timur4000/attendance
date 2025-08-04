import { createElement } from './createElement.js';


/**
 * @function
 *
 * @description Implements loading link element.
 *
 * @param { string } href
 *
 * @param { string } rel
 *
 * @param { boolean } isPromise
 *
 * @return { Promise<HTMLLinkElement> }
 **/
export function loadLink(href, rel, isPromise = true)
{
    const element = createElement('link', { rel: rel, href: href });
    
    document.body.append(element);
    
    if (isPromise)
    {
        return new Promise(resolve => element.onload = () => resolve(element));
    }
    
    return element
}
