import { RegularExpressions } from '../../Classes/Standards/RegularExpressions/RegularExpressions.js';


/**
 * @function
 *
 * @description Checks if the given argument is a selector.
 *
 * @param { string } verifiable
 *
 * @return { boolean }
 **/
export function isSelector(verifiable)
{
    return RegularExpressions.selector().test(verifiable);
}
