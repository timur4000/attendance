/**
 * @const
 *
 * @enum { number }
 *
 * @description Contains all possible ready states of the HttpRequest class.
 **/
export const HttpRequestReadyStatesClassifier =
    {
        UNSET: 0,
        
        OPENED: 1,
        
        HEADERS_RECEIVED: 2,
        
        LOADING: 3,
        
        DONE: 4,
    };
