import { createElement } from './createElement.js';


/**
 * @function
 *
 * @description Implements loading script element.
 *
 * @param { string } src
 *
 * @param { boolean } isPromise
 *
 * @return { Promise<HTMLScriptElement> }
 **/
export function loadScript(src, isPromise = true)
{
    const element = createElement('script', { src: src });
    
    document.body.append(element);
    
    if (isPromise)
    {
        return new Promise(resolve => element.onload = () => resolve(element));
    }
    
    return element;
}
