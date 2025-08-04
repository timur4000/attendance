/**
 * @const
 *
 * @enum { string }
 *
 * @description Contains all possible events of the HttpRequest class.
 **/
export const HttpRequestEventsClassifier =
    {
        STATE_CHANGE: 'http-request:state-change',
        
        SUCCESS: 'http-request:success',
        
        ERROR: 'http-request:error',
        
        BEFORE_SEND: 'http-request:before-send',
        
        AFTER_SEND: 'http-request:after-send',
        
        TIMEOUT: 'http-request:timeout',
        
        CANCEL: 'http-request:cancel',
        
        COMPLETE: 'http-request:complete',
    };
