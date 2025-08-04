import { RegularExpressions } from '../../Classes/Standards/RegularExpressions/RegularExpressions.js';


/**
 * @function
 *
 * @description Gets name of given function.
 *
 * @param { Function } fn - The function whose name to get.
 *
 * @return { string } The function name.
 **/
export function getFunctionName(fn)
{
    const match = String(fn).match(RegularExpressions.functionNameSearch());
    
    return (match && match[ 1 ]) || 'anonymous';
}
