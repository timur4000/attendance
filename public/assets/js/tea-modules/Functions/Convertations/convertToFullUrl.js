import { isUrl } from '../Is/isUrl.js';
import { trim }  from '../Strings/trim.js';
import { LibraryChars } from '../../Classes/Standards/Chars/LibraryChars.js';


/**
 * @function
 *
 * @description Converts any string to full url.
 *
 * @param { string } url - The url to convert.
 *
 * @return { string } The converted url.
 **/
export function convertToFullUrl(url)
{
    if (isUrl(url))
    {
        return url;
    }
    
    return location.origin + LibraryChars.directorySeparator + trim(url, LibraryChars.directorySeparator);
}
