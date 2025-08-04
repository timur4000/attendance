import { CustomEvents } from '../../Classes/CustomEvents/CustomEvents.js';


export class TapPressing
{
    /**
     * @private
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @private
     *
     * @type { number }
     **/
    _intervalId = 0;
    
    /**
     * @private
     *
     * @type { number }
     **/
    _intervalDelay = 250;
    
    /**
     * @private
     *
     * @type { DOMHighResTimeStamp }
     **/
    _currentMilliseconds;
    
    /**
     * @private
     *
     * @type { boolean }
     **/
    _isTap = false;
    
    /**
     * @public
     *
     * @type { number }
     **/
    milliseconds;
    
    /**
     * @public
     *
     * @constructor
     *
     * @param { number } seconds
     **/
    constructor(seconds = 2000)
    {
        this.customEvents = new CustomEvents();
        
        this.milliseconds = seconds;
    }
    
    /**
     * @public
     *
     * @method
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this._eventsProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements process of the events.
     *
     * @return { void }
     **/
    _eventsProcessing()
    {
        // if (isMobileBrowser() || isTabletBrowser())
        // {
            window.addEventListener('touchstart', this._tap.bind(this));
            
            window.addEventListener('touchend', this._unTap.bind(this));
            
            window.addEventListener('touchmove', this._move.bind(this));

            // return ;
        // }
        
        // window.addEventListener('mousedown', this._tap.bind(this));
        
        // window.addEventListener('mouseup', this._unTap.bind(this));
        
        // window.addEventListener('mousemove', this._move.bind(this));
    }
    
    /**
     * @private
     *
     * @method
     *
     * @description Implements logic for mousedown/touchstart events.
     *
     * @param { MouseEvent | TouchEvent } event
     *
     * @return { void }
     **/
    _tap(event)
    {
        this._isTap = true;
        
        this._currentMilliseconds = performance.now();
        
        this._intervalId = setInterval(this._intervalHandler.bind(this), this._intervalDelay);
    }
    
    /**
     * @private
     *
     * @method
     *
     * @description Implements logic of the interval callback.
     *
     * @return { void }
     **/
    async _intervalHandler()
    {
        if (!this.isOver())
        {
            return ;
        }
        
        this.clear();
        
        this.customEvents.execute('tap');
    }
    
    /**
     * @public
     *
     * @description Clears the all states.
     *
     * @return { void }
     **/
    clear()
    {
        clearInterval(this._intervalId);
        
        this._isTap = false;
    }
    
    /**
     * @private
     *
     * @method
     *
     * @description Implements logic for mouseup/touchend events.
     *
     * @return { void }
     **/
    _unTap(event)
    {
        if (!this._isTap)
        {
            return ;
        }
        
        this.clear();
        
        this.customEvents.execute('un-tap');
    }
    
    /**
     * @private
     *
     * @method
     *
     * @description Implements logic for mousemove/touchmove events.
     *
     * @param { MouseEvent | TouchEvent } event
     *
     * @return { void }
     **/
    _move(event)
    {
        if (!this._isTap)
        {
            return ;
        }
        
        this.clear();
    }
    
    /**
     * @private
     *
     * @method
     *
     * @description Checks whether current milliseconds is over.
     *
     * @return { boolean }
     **/
    isOver()
    {
        return (performance.now() - this._currentMilliseconds) > this.milliseconds;
    }
}
