/**
 * @function
 *
 * @description Checks if the browser is a mobile browser.
 *
 * @return { boolean }
 **/
export function isMobileBrowser()
{
    let userAgent = navigator.userAgent;
    
    let mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    
    return mobileRegex.test(userAgent);
}
