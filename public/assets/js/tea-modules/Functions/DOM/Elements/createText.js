/**
 * @function
 *
 * @description Creates text node.
 *
 * @param { string } text
 *
 * @return { Text }
 **/
export function createText(text = '')
{
    return document.createTextNode(text);
}
