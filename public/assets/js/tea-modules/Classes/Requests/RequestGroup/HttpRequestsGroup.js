import { HttpRequestsGroupSettings } from './HttpRequestsGroupSettings.js';
import { HttpRequest }               from '../HttpRequest.js';
import { Queue }                     from '../../Arrays/Queue.js';
import { isHttpRequest }             from '../../../Functions/Is/isHttpRequest.js';
import { WebConsole }                from '../../WebConsole/WebConsole.js';
import { CustomEvents } from '../../CustomEvents/CustomEvents.js';
import { HttpRequestsGroupEventsClassifier } from './HttpRequestsGroupEventsClassifier.js';


/**
 * @description Implements group logic of the http requests.
 **/
export class HttpRequestsGroup
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { HttpRequestsGroupSettings }
     **/
    settings;
    
    /**
     * @private
     *
     * @type { Queue }
     **/
    _queue;
    
    /**
     * @private
     *
     * @type { Map<any, HttpRequest> }
     **/
    _requests;
    
    /**
     * @private
     *
     * @type { number }
     **/
    _queueCheckerIntervalId = 0;
    
    /**
     * @private
     *
     * @type { boolean }
     **/
    _isQueueCheckerActive = false;
    
    /**
     * @constructor
     *
     * @param { HttpRequestsGroupSetting | HttpRequestsGroupSettings } settings
     **/
    constructor(settings)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings instanceof HttpRequestsGroupSettings ? settings : new HttpRequestsGroupSettings(settings);
        
        this._queue = new Queue();
        
        this._requests = new Map();
    }
    
    /**
     * @private
     *
     * @description Launches the queue checker process.
     *
     * @return { void }
     **/
    _queueCheckerLaunch()
    {
        if (this._isQueueCheckerActive)
        {
            return ;
        }
        
        this._isQueueCheckerActive = true;
        
        this._queueCheckerSetup();
    }
    
    /**
     * @private
     *
     * @description Setups the queue checker timeout.
     *
     * @return { void }
     **/
    _queueCheckerSetup()
    {
        this._queueCheckerIntervalId = setTimeout(this._queueCheckerHandler.bind(this), 100);
    }
    
    /**
     * @private
     *
     * @description Stops the queue checker process.
     *
     * @return { void }
     **/
    _queueCheckerStop()
    {
        clearTimeout(this._queueCheckerIntervalId);
    }
    
    /**
     * @private
     *
     * @description Implements a handler for the queue checker process.
     *
     * @return { void }
     **/
    _queueCheckerHandler()
    {
        if (this._queue.isEmpty())
        {
            this._queueCheckerStop();
            
            return ;
        }
        
        let value;
        
        /**
         * @todo Needs refactoring.
         **/
        if (!this.isCrowded())
        {
            while (value = this._queue.dequeue())
            {
                this.create(value.httpRequest, value.key);
                
                if (this.isCrowded())
                {
                    break ;
                }
            }
        }
        
        this._queueCheckerSetup();
    }
    
    /**
     * @public
     *
     * @description Creates or adds http request by the specified settings.
     *
     * @param { HttpRequestSettingProperties | HttpRequest } settingsOrHttpRequest
     *
     * @param { any ? } key
     *
     * @return { HttpRequest }
     **/
    create(settingsOrHttpRequest, key)
    {
        const httpRequest = isHttpRequest(settingsOrHttpRequest) ? settingsOrHttpRequest : new HttpRequest(settingsOrHttpRequest);
        
        key = key || httpRequest.settings.id;
        
        if (httpRequest.isSend)
        {
            new WebConsole(`Http request is sending!`).error();
            
            return httpRequest;
        }
        
        if (this.isCrowded())
        {
            this._queue.enqueue({ httpRequest, key  });
            
            this._queueCheckerLaunch();
            
            return httpRequest;
        }
        
        const handler = (response) =>
        {
            this.remove(httpRequest);
            
            this.customEvents.execute(HttpRequestsGroupEventsClassifier.COMPLETE, response, httpRequest, key);
        }
        
        httpRequest.execute().then(handler).catch(handler);
        
        this._requests.set(key, httpRequest);
        
        return httpRequest;
    }
    
    /**
     * @public
     *
     * @description Returns http request by the specified key.
     *
     * @param { any } key
     *
     * @return { HttpRequest | undefined }
     **/
    get(key)
    {
        return this._requests.get(key);
    }
    
    /**
     * @public
     *
     * @description Determines whether the http request is exist.
     *
     * @param { any } key
     *
     * @return { boolean }
     **/
    has(key)
    {
        return this._requests.has(key);
    }
    
    /**
     * @public
     *
     * @description Removes the http request by the specified key or http request.
     *
     * @param { any | HttpRequest } keyOrHttpRequest
     *
     * @return { boolean }
     **/
    remove(keyOrHttpRequest)
    {
        if (isHttpRequest(keyOrHttpRequest))
        {
            keyOrHttpRequest = this.getKeyByValue(keyOrHttpRequest);
        }
        
        return this._requests.delete(keyOrHttpRequest);
    }
    
    /**
     * @public
     *
     * @description Cancels the http request by the specified key or http request.
     *
     * @param { any | HttpRequest } keyOrHttpRequest
     *
     * @return { void }
     **/
    cancel(keyOrHttpRequest)
    {
        if (!isHttpRequest(keyOrHttpRequest))
        {
            keyOrHttpRequest = this.get(keyOrHttpRequest);
        }
        
        if (!keyOrHttpRequest)
        {
            return ;
        }
        
        if (keyOrHttpRequest.isSend && !keyOrHttpRequest.isCompleted())
        {
            keyOrHttpRequest.cancel();
        }
        
        keyOrHttpRequest.cancel();
    }
    
    /**
     * @public
     *
     * @description Returns key by the specified http request.
     *
     * @param { HttpRequest } httpRequest
     *
     * @return { any }
     **/
    getKeyByValue(httpRequest)
    {
        for (const [ key, mapHttpRequest ] of this._requests)
        {
            if (mapHttpRequest === httpRequest)
            {
                return key;
            }
        }
        
        return null;
    }
    
    /**
     * @public
     *
     * @description Determines whether collection of http requests is empty.
     *
     * @return { boolean }
     **/
    isEmpty()
    {
        return !this._requests.size;
    }
    
    /**
     * @public
     *
     * @description Returns count of the http requests.
     *
     * @return { number }
     **/
    getCount()
    {
        return this._requests.size;
    }
    
    /**
     * @public
     *
     * @description Determines whether collection of http requests is crowded.
     *
     * @return { boolean }
     **/
    isCrowded()
    {
        return this._requests.size >= this.settings.maxRequests;
    }
}
