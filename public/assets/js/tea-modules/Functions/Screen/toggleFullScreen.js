import { isUndefined } from '../Is/isUndefined.js';
import { isFullScreen } from '../Is/isFullScreen.js';


/**
 * @function
 *
 * @description Toggles the fullscreen mode for the document.
 *
 * @param { boolean ? } force
 *
 * @return { void }
 **/
export async function toggleFullScreen(force)
{
    const isForce = !isUndefined(force) && force;
    
    if (isForce && !isFullScreen())
    {
        await document.documentElement.requestFullscreen();
    }
    
    if (!isForce && isFullScreen())
    {
        await document.exitFullscreen();
    }
}
