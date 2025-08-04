import { HttpRequestSettings } from './HttpRequestSettings.js';
import { convertToFullUrl }    from '../../Functions/Convertations/convertToFullUrl.js';
import { HttpRequestMethodsClassifier } from './Standards/HttpRequestMethodsClassifier.js';
import { isObject } from '../../Functions/Is/isObject.js';
import { isHtmlElement } from '../../Functions/Is/isHtmlElement.js';
import { isArray } from '../../Functions/Is/isArray.js';
import { isFormData } from '../../Functions/Is/isFormData.js';
import { CustomEvents } from '../CustomEvents/CustomEvents.js';
import { HttpRequestEventsClassifier } from './Standards/HttpRequestEventsClassifier.js';
import { WebConsole } from '../WebConsole/WebConsole.js';
import { ErrorMessages } from '../Standards/Errors/ErrorMessages.js';
import { WebConsoleColors } from '../Standards/WebConsole/WebConsoleColors.js';
import { NotificationItemThemesClassifier } from '../../../components/Notifications/Classifiers/NotificationItemThemesClassifier.js';
import { isJson } from '../../Functions/Is/isJson.js';
import { isFunction } from '../../Functions/Is/isFunction.js';


/**
 * @class
 *
 * @description Implements logic for http requests.
 **/
export class HttpRequest
{
    /**
     * @typedef { Object } ResponseStandard
     *
     * @property { any } data
     *
     * @property { number } total
     *
     * @property { Array } query
     *
     * @property { Array } post
     *
     * @property { Array } json
     *
     * @property { string } message
     *
     * @property { number } status
     *
     * @property { Object } record
     *
     * @property { Array } errors
     **/
    
    /**
     * @public
     *
     * @type { HttpRequestSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { URL }
     **/
    url;
    
    /**
     * @public
     *
     * @type { XMLHttpRequest }
     **/
    xhr;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isTimeout = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isCancel = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isSend = false;
    
    /**
     * @private
     *
     * @type { Promise<any> }
     **/
    _promise;
    
    /**
     * @private
     *
     * @type { Document | XMLHttpRequestBodyInit | null }
     **/
    _body = null;
    
    /**
     * @private
     *
     * @type { Array<this> }
     *
     * @todo Needs to be changed to Map collection.
     **/
    static _instances = [];
    
    /**
     * @constructor
     *
     * @param { HttpRequestSettingProperties } settings
     *
     * @return { HttpRequest }
     **/
    constructor(settings)
    {
        this.settings = new HttpRequestSettings(settings);
        
        this.customEvents = new CustomEvents();
        
        this.url = new URL(convertToFullUrl(isFunction(settings.url) ? settings.url() : settings.url));
        
        HttpRequest._instances.push(this);
    }
    
    /**
     * @public
     *
     * @description Implements execute for the request.
     *
     * @return { Promise<any> }
     **/
    execute()
    {
        this.xhr = new XMLHttpRequest();
        
        this._dataProcessing();
        
        this.xhr.timeout = this.settings.timeout;
        
        this.xhr.responseType = this.settings.responseType;
        
        this.xhr.withCredentials = this.settings.withCredentials;
        
        this.xhr.open(this.settings.method, this.url, this.settings.async, this.settings.username, this.settings.password);
        
        this.appendHeaders(this.settings.headers);
        
        return this._promise = new Promise(this._executeProcessing.bind(this));
    }

    /**
     * @private
     *
     * @description Implements processing for the promise of the execute method.
     *
     * @param { resolve: (value: any) => void } resolve
     *
     * @param { resolve: (value: any) => void } reject
     *
     * @return { void }
     **/
    _executeProcessing(resolve, reject)
    {
        this.customEvents.execute(HttpRequestEventsClassifier.BEFORE_SEND, this.xhr, this);
        
        this.xhr.send(this._body);
        
        this.isSend = true;
        
        this.xhr.addEventListener('timeout', this._timeoutHandler.bind(this));
        
        this.customEvents.execute(HttpRequestEventsClassifier.AFTER_SEND, this.xhr, this);
        
        this.xhr.addEventListener('readystatechange', () =>
        {
            this.customEvents.execute(HttpRequestEventsClassifier.STATE_CHANGE, this.xhr);
            
            if (this.xhr.readyState !== XMLHttpRequest.DONE)
            {
                return ;
            }
            
            if (this.settings.removeAfterDone)
            {
                HttpRequest.removeInstance(this);
            }
            
            if (this.xhr.status !== 200)
            {
                this.customEvents.execute(HttpRequestEventsClassifier.ERROR, this.xhr);
                
                // this._createErrorNotification(this.xhr.statusText);
                
                reject(this.xhr);
                
                this.customEvents.execute(HttpRequestEventsClassifier.COMPLETE, this, this.xhr);
                
                return;
            }
            
            this.customEvents.execute(HttpRequestEventsClassifier.SUCCESS, this.xhr.response, this.xhr);
            
            this.customEvents.execute(HttpRequestEventsClassifier.COMPLETE, this, this.xhr);
            
            resolve(this.xhr.response);
        });
    }
    
    /**
     * @private
     *
     * @description Creates error notification with the given text.
     *
     * @param { string } text
     *
     * @return { void }
     **/
    _createErrorNotification(text)
    {
        app.notifications.create(
            {
                heading: text,
                svgId: 'essential-danger',
                theme: NotificationItemThemesClassifier.ERROR,
                paragraphs: [ this.url.toString() ],
            }
        );
    }
    
    /**
     * @private
     *
     * @description Implements handler for the timeout of the request.
     *
     * @return { void }
     **/
    _timeoutHandler()
    {
        this.isTimeout = true;
        
        // this._createErrorNotification(ErrorMessages.requestTimeoutError());
        
        this.customEvents.execute(HttpRequestEventsClassifier.TIMEOUT, this.xhr);
        
        new WebConsole(`${ ErrorMessages.requestTimeoutError() } - ${ this.url }`)
            .color(WebConsoleColors.red)
            .log();
    }
    
    /**
     * @private
     *
     * @description Implements processing data depending on the method type.
     *
     * @return { void }
     **/
    _dataProcessing()
    {
        switch (this.settings.method)
        {
            case HttpRequestMethodsClassifier.GET:
            {
                this.appendSearchParams(this.settings.data);
                
                break ;
            }
            case HttpRequestMethodsClassifier.POST:
            case HttpRequestMethodsClassifier.PUT:
            case HttpRequestMethodsClassifier.PATCH:
            case HttpRequestMethodsClassifier.DELETE:
            {
                this.setBody(this.settings.data);
                
                break ;
            }
        }
    }
    
    /**
     * @public
     *
     * @description Appends the given headers to the request.
     *
     * @param { Object } headers
     *
     * @return { void }
     **/
    appendHeaders(headers)
    {
        for (const key in headers)
        {
            this.xhr.setRequestHeader(key, headers[key]);
        }
    }
    
    /**
     * @public
     *
     * @description Appends search params to the request.
     *
     * @param { Object } params
     *
     * @return { void }
     **/
    appendSearchParams(params)
    {
        for (const key in params)
        {
            this.url.searchParams.append(key, params[key]);
        }
    }
    
    /**
     * @public
     *
     * @description Sets the given data to the request body.
     *
     * @param { HttpRequestData } data
     **/
    setBody(data)
    {
        if (isFunction(data))
        {
            data = data();
        }
        
        if (isHtmlElement(data))
        {
            this._body = new FormData(data);
            
            return ;
        }
        
        if (isFormData(data))
        {
            this._body = data;
            
            return ;
        }

        if (isJson(data))
        {
            this._body = data;
        }

        if (isObject(data) || isArray(data))
        {
            this._body = JSON.stringify(data);
        }
    }
    
    /**
     * @public
     *
     * @description Cancels of the current request.
     *
     * @return { void }
     **/
    cancel()
    {
        this.isCancel = true;
        
        this.xhr.abort();
        
        this.customEvents.execute(HttpRequestEventsClassifier.CANCEL, this.xhr);
    }
    
    /**
     * @public
     *
     * @description Checks if the request is completed.
     *
     * @return { boolean }
     **/
    isCompleted()
    {
        return this.xhr.readyState === 4;
    }
    
    /**
     * @public
     *
     * @description Returns response of request.
     *
     * @return { any | ResponseStandard }
     **/
    getResponse()
    {
        return this.xhr.response;
    }
    
    /**
     * @public
     *
     * @description Returns ready state of the request.
     *
     * @return { HttpRequestReadyStatesClassifier }
     **/
    getReadyState()
    {
        return this.xhr.readyState;
    }
    
    /**
     * @public
     *
     * @description Returns instance by the specified id.
     *
     * @param { string } id
     *
     * @return { HttpRequest | undefined }
     **/
    static getInstance(id)
    {
        return HttpRequest._instances.find(httpRequest => httpRequest.settings.id === id);
    }
    
    /**
     * @public
     *
     * @description Returns index of the instance by the specified id or instance.
     *
     * @param { HttpRequest | string } idOrInstance
     *
     * @return { HttpRequest | undefined }
     **/
    static getInstanceIndex(idOrInstance)
    {
        return HttpRequest._instances.find(httpRequest => idOrInstance instanceof HttpRequest ? httpRequest === idOrInstance : httpRequest.settings.id === idOrInstance);
    }
    
    /**
     * @public
     *
     * @description Removes instance by the specified id or instance.
     *
     * @param { HttpRequest | string } idOrInstance
     *
     * @return { Array<HttpRequest> }
     **/
    static removeInstance(idOrInstance)
    {
        return HttpRequest._instances.splice(this.getInstanceIndex(idOrInstance), 1);
    }
}
