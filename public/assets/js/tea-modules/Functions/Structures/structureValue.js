import { LibraryChars } from '../../Classes/Standards/Chars/LibraryChars.js';
import { isEmpty }      from '../Is/isEmpty.js';


/**
 * @function
 *
 * @description Returns deep value from object or array by string key.
 *
 * @example key.key.key
 *
 * @param { Object | Array } record
 *
 * @param { string } string
 *
 * @param { any ? } defaultValue
 *
 * @return { any }
 **/
export function structureValue(record, string, defaultValue = null)
{
    const keys = string.split(LibraryChars.structureStringKeySeparator);
    
    function _deep(record)
    {
        if (!keys.length)
        {
            return record;
        }
        
        const key = keys.shift();
        
        if (isEmpty(record[ key ]))
        {
            return defaultValue;
        }
        
        return _deep(record[ key ]);
    }
    
    return _deep(record);
}
