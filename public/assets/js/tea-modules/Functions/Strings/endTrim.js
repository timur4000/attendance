import { RegularExpressions } from '../../Classes/Standards/RegularExpressions/RegularExpressions.js';


/**
 * @function
 *
 * @description Trims all similar of given char from end string.
 *
 * @param { string } string - The string to trim.
 *
 * @param { string } char - The char to remove.
 *
 * @return { string } The processed string.
 **/
export function endTrim(string, char = ' ')
{
    return string.replace(RegularExpressions.endTrim(char), '');
}