import { convertToString }    from '../Convertations/convertToString.js';
import { RegularExpressions } from '../../Classes/Standards/RegularExpressions/RegularExpressions.js';


/**
 * @function
 *
 * @description Gets argument from given function.
 *
 * @param { function } fn - The function whose arguments to search.
 *
 * @param { number ? } [position = 0] - The position of argument.
 *
 * @return { string } The argument name.
 **/
export function getFunctionArgumentName(fn, position = 0)
{
    const stringFunction = convertToString(fn);
    
    const matches = stringFunction.match(RegularExpressions.functionArgumentsBlockSearch());
    
    let match = matches[ 1 ].replace(/\{|\s*}\s*=\s*{[^}]*}|\s*/g, '');
    
    match = match.replace(/=[a-z]*/ig, '');
    
    const argumentsArray = match.split(',');
    
    return argumentsArray[ position ] || '';
}
