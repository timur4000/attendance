import { createSvgElement } from './createSvgElement.js';
import { createElement }    from './createElement.js';


/**
 * @function
 *
 * @description Creates html node of the no-image element.
 *
 * @param { number } size
 *
 * @return { HTMLElement }
 **/
export function createNoImage(size = 30)
{
    const icon = createSvgElement('video-gallery-slash', { class: `icon icon-size-${ size }` });
    
    return createElement('div', { class: 'no-image' }, [ icon ]);
}
