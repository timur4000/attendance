import { RegularExpressions } from '../../Classes/Standards/RegularExpressions/RegularExpressions.js';


/**
 * @function
 *
 * @description Trims all similar of given char from start string.
 *
 * @param { string } string - The string to trim.
 *
 * @param { string } char - The char to remove.
 *
 * @return { string } The processed string.
 **/
export function startTrim(string, char = ' ')
{
    return string.replace(RegularExpressions.startTrim(char), '');
}