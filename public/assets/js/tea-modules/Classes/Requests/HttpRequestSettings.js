import { HttpRequestMethodsClassifier } from './Standards/HttpRequestMethodsClassifier.js';
import { structureMerge } from '../../Functions/Structures/structureMerge.js';
import { csrfToken } from '../../Functions/DOM/Queries/csrfToken.js';


/**
 * @class
 *
 * @description Contains all possible settings of the HttpRequest class.
 **/
export class HttpRequestSettings
{
    /**
     * @typedef { Object | Array | FormData | HTMLFormElement | Function } HttpRequestData
     **/
    
    /**
     * @typedef { Object } HttpRequestSettingProperties
     *
     * @property { string | Function } url - The url of the request.
     *
     * @property { number ? } timeout - The timeout of the request.
     *
     * @property { string ? } id - The id of the instance.
     *
     * @property { boolean ? } removeAfterDone - Determines whether to remove instance from requests property.
     *
     * @property { HttpRequestMethodsClassifier ? } method - The method of the request.
     *
     * @property { XMLHttpRequestResponseType ? } responseTypes - The response type of the request.
     *
     * @property { boolean ? } withCredentials - The response type of the request.
     *
     * @property { Object ? } headers - The headers of the request.
     *
     * @property { boolean ? } async - Determines whether async send is needed.
     *
     * @property { string ? } username - The username for the request authentication.
     *
     * @property { string ? } password - The password for the request authentication.
     *
     * @property { HttpRequestData ? } data - The data for the request.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    url;
    
    /**
     * @public
     *
     * @type { number }
     **/
    timeout = 30_000;
    
    /**
     * @public
     *
     * @type { string }
     **/
    id;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    removeAfterDone = true;
    
    /**
     * @public
     *
     * @type { HttpRequestMethodsClassifier }
     **/
    method = HttpRequestMethodsClassifier.GET;
    
    /**
     * @public
     *
     * @type { XMLHttpRequestResponseType }
     **/
    responseType = 'json';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withCredentials;
    
    /**
     * @public
     *
     * @type { Object<string, string> }
     **/
    headers = { 'X-Requested-With': 'XmlHttpRequest' };
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    async = true;
    
    /**
     * @public
     *
     * @type { string }
     **/
    username;
    
    /**
     * @public
     *
     * @type { string }
     **/
    password;
    
    /**
     * @public
     *
     * @type { HttpRequestData }
     **/
    data;
    
    /**
     * @constructor
     *
     * @param { HttpRequestSettingProperties } settings
     *
     * @return { HttpRequestSettings }
     **/
    constructor(settings = {})
    {
        this._csrfTokenProcessing();
        
        structureMerge(this, settings);
    }
    
    /**
     * @private
     *
     * @description Implements adding csrf token to the request if them exist.
     *
     * @return { void }
     **/
    _csrfTokenProcessing()
    {
        const csrf = csrfToken();
        
        if (csrf)
        {
            this.headers['X-CSRF-TOKEN'] = csrf.content;
        }
    }
}
