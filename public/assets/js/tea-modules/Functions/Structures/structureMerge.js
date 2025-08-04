import { isStructure }       from '../Is/isStructure.js';
import { isArray }           from '../Is/isArray.js';
import { isObject }          from '../Is/isObject.js';
import { getStructureEmpty } from './getStructureEmpty.js';
import { isEmpty }           from '../Is/isEmpty.js';
import { isDate }            from '../Is/isDate.js';
import { isFormData }        from '../Is/isFormData.js';
import { isHtmlElement }     from '../Is/isHtmlElement.js';
import { isElement }         from '../Is/isElement.js';
import { isCyclic }          from '../Is/isCyclic.js';
import { isHttpRequest }     from '../Is/isHttpRequest.js';
import { isDocumentFragment } from '../Is/isDocumentFragment.js';
import { isXhr } from '../Is/isXhr.js';


/**
 * @function
 *
 * @description Clones and merges the source structure to target structure if key existing in target structure.
 *
 * @template T, S
 *
 * @param { T<Object> | T<Array> } target
 *
 * @param { S<Object> | S<Array> } source
 *
 * @param { boolean } [isCyclicCheck]
 *
 * @return { T & S }
 **/
export function structureMerge(target, source, isCyclicCheck = false)
{
    for (const key in source)
    {
        const sourceValue = source[ key ];
        
        let targetValue = target[ key ];
        
        if (isDate(sourceValue) || isFormData(sourceValue) || isHtmlElement(sourceValue) || isDocumentFragment(sourceValue) || isElement(sourceValue) || isHttpRequest(sourceValue) || isXhr(sourceValue) || (isCyclicCheck && isCyclic(sourceValue)))
        {
            target[ key ] = sourceValue;
            
            continue ;
        }
        
        if (isStructure(sourceValue))
        {
            if (isArray(target))
            {
                target.push(targetValue = getStructureEmpty(sourceValue));
            }
            
            if (isEmpty(targetValue) && isObject(source))
            {
                target[ key ] = targetValue = getStructureEmpty(sourceValue);
            }
            
            structureMerge(targetValue, sourceValue);
            
            continue;
        }
        
        if (isArray(target))
        {
            target.push(sourceValue);
        }
        else
        {
            target[ key ] = sourceValue;
        }
    }
}
