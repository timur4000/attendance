import { createElement } from '../DOM/Elements/createElement.js';


/**
 * TODO: execCommand is deprecated.
 *
 * @function
 *
 * @description Saves the given text to clipboard.
 *
 * @param { string } text
 *
 * @param { number } end
 *
 * @return { void }
 **/
export function toClipboard(text, end = 99999)
{
    const textarea = createElement('textarea');
    
    document.body.append(textarea);
    
    textarea.value = text;
    
    textarea.select();
    
    textarea.setSelectionRange(0, end);
    
    document.execCommand('copy');
    
    textarea.remove();
}
