import { querySelector } from './querySelector.js';


/**
 * @function
 *
 * @description Returns csrf token.
 *
 * @return { HTMLMetaElement }
 **/
export function csrfToken()
{
    return querySelector('[name="csrf-token"]');
}
