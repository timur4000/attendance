/**
 * @function
 *
 * @description Checks if the specified argument is a XmlHttpRequest.
 *
 * @param { any } verifiable
 *
 * @return { boolean }
 **/
export function isXhr(verifiable)
{
    return verifiable instanceof XMLHttpRequest;
}
