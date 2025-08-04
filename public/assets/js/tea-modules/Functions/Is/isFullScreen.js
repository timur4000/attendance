/**
 * @function
 *
 * @description Determines whether current window mode is fullscreen.
 *
 * @return { boolean }
 **/
export function isFullScreen()
{
    return document.fullscreenElement != null || document.webkitFullscreenElement != null || document.mozFullScreenElement != null || document.msFullscreenElement != null;
}
