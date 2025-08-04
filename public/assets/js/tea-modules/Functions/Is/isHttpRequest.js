import { HttpRequest } from '../../Classes/Requests/HttpRequest.js';


/**
 * @function
 *
 * @description Checks if the given argument is an instance of the http request.
 *
 * @param { any } verifiable
 *
 * @return { Boolean }
 **/
export function isHttpRequest(verifiable)
{
    return verifiable instanceof HttpRequest;
}
