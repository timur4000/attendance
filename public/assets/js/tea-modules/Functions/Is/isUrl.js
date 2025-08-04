import { RegularExpressions } from '../../Classes/Standards/RegularExpressions/RegularExpressions.js';


/**
 * @function
 *
 * @description Checks if the given argument is an url.
 *
 * @param { string } verifiable
 *
 * @return { boolean }
 **/
export function isUrl(verifiable)
{
    return RegularExpressions.url().test(verifiable);
}