import { CustomEvents } from '../CustomEvents/CustomEvents.js';
import { ActivityEventsClassifier } from './ActivityEventsClassifier.js';


/**
 * @description Implements logic of the activities.
 **/
export class Activity
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @readonly
     *
     * @public
     *
     * @type { number }
     **/
    period;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isActive = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isAction = false;
    
    /**
     * @readonly
     *
     * @public
     *
     * @type { [ 'mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend', 'keydown', 'keyup', 'dragstart', 'dragend', 'scroll' ] }
     **/
    events = [ 'mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend', 'keydown', 'keyup', 'dragstart', 'dragend', 'scroll' ];
    
    /**
     * @readonly
     *
     * @public
     *
     * @type { [ 'mousedown', 'touchstart', 'keydown', 'dragstart' ] }
     **/
    actionStartEvents = [ 'mousedown', 'touchstart', 'keydown', 'dragstart' ];
    
    /**
     * @readonly
     *
     * @public
     *
     * @type { [ 'mouseup', 'touchend', 'keyup', 'dragend' ] }
     **/
    actionEndEvents = [ 'mouseup', 'touchend', 'keyup', 'dragend' ];
    
    /**
     * @private
     *
     * @type { number }
     **/
    _timeoutId;
    
    /**
     * @constructor
     *
     * @param { number ? } period
     **/
    constructor(period = 10000)
    {
        this.customEvents = new CustomEvents();
        
        this.period = period;
        
        this.events.forEach(event => document.addEventListener(event, this._handler.bind(this), true));
        
        this._startTimeout();
    }
    
    /**
     * @private
     *
     * @description Implements a handler for the events.
     *
     * @param { Event } event
     *
     * @return { void }
     **/
    _handler(event)
    {
        const type = event.type;
        
        if (!this.isActive)
        {
            this.isActive = true;
            
            this.customEvents.execute(ActivityEventsClassifier.ON, this.isActive);
            
            this.customEvents.execute(ActivityEventsClassifier.TOGGLE, this.isActive);
        }
        
        if (!this.isAction && this.actionStartEvents.includes(type))
        {
            this.isAction = true;

            this._cancelTimeout();
        }

        if (this.isAction && this.actionEndEvents.includes(type))
        {
            this.isAction = false;
        }
        
        this._cancelTimeout();
        
        !this.isAction && this._startTimeout();
    }
    
    /**
     * @private
     *
     * @description Starts the timeout process.
     *
     * @return { void }
     **/
    _startTimeout()
    {
        this._timeoutId = setTimeout(this._timeoutHandler.bind(this), this.period);
    }
    
    /**
     * @private
     *
     * @description Cancels the timeout process.
     *
     * @return { void }
     **/
    _cancelTimeout()
    {
        clearTimeout(this._timeoutId);
    }
    
    /**
     * @private
     *
     * @description Implements a handler of the timeout method.
     *
     * @return { void }
     **/
    _timeoutHandler()
    {
        this.isActive = false;
        
        this.customEvents.execute(ActivityEventsClassifier.OFF, this.isActive);
        
        this.customEvents.execute(ActivityEventsClassifier.TOGGLE, this.isActive);
    }
}
