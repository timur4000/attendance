import { isUndefined } from '../Is/isUndefined.js';
import { isStructureEmpty } from '../Is/isStructureEmpty.js';


/**
 * @function
 *
 * @description Formats the specified string by the specified replacements.
 *
 * @param { string } string
 *
 * @param { Array<string> } replacements
 *
 * @return { string }
 **/
export function format(string, replacements)
{
    if (isStructureEmpty(replacements))
    {
        return string;
    }
    
    return string.replace(/{(\d+)}/g, (match, number) => isUndefined(replacements[ number ]) ? match : replacements[ number ]);
}
