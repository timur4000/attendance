import { isEmpty } from '../Is/isEmpty.js';


/**
 * @function
 *
 * @description Gets constructor of given class/instance.
 *
 * @param { Class | Object } target - The class/instance to search for the constructor.
 *
 * @return { function } The finding constructor.
 **/
export function getClassConstructor(target)
{
    if (!isEmpty(target.name))
    {
        return target;
    }
    
    return target.constructor;
}
