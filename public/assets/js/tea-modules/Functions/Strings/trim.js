import { startTrim } from './startTrim.js';
import { endTrim }   from './endTrim.js';


/**
 * @function
 *
 * @description Trims all similar of given char from start & end string.
 *
 * @param { string } string - The string to trim.
 *
 * @param { string } char - The char to remove.
 *
 * @return { string } The processed string.
 **/
export function trim(string, char)
{
    string = startTrim(string, char);
    
    string = endTrim(string, char);
    
    return string;
}
