import { getClassConstructor } from './getClassConstructor.js';


/**
 * @function
 *
 * @description Gets name of given class.
 *
 * @param { Class | Object } target - The target whose name to get.
 *
 * @return { string } The class name.
**/
export function getClassName(target)
{
    const constructor = getClassConstructor(target);
    
    return constructor.name;
}
