import { RegularExpressions }  from '../../Classes/Standards/RegularExpressions/RegularExpressions.js';
import { convertToString }     from '../Convertations/convertToString.js';
import { getClassConstructor } from '../Classes/getClassConstructor.js';


/**
 * @function
 *
 * @description Checks if the given argument is a class.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isClass(verifiable)
{
    const isClassKeyword = (a) => RegularExpressions.classKeywordSearch().test(convertToString(a));
    
    const constructor = verifiable && getClassConstructor(verifiable);
    
    return !!verifiable && isClassKeyword(constructor);
}
