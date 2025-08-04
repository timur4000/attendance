import { TimeOutSettings } from './TimeOutSettings.js';


/**
 * @description Implements advances logic for the setTimeout function.
 **/
export class TimeOut
{
    /**
     * @protected
     *
     * @type { TimeOutSettings }
     **/
    _settings;
    
    /**
     * @protected
     *
     * @type { number }
     **/
    _timeoutId;
    
    /**
     * @constructor
     *
     * @param { TimeOutSetting | TimeOutSettings } settings
     **/
    constructor(settings)
    {
        this._settings = settings instanceof TimeOutSettings ? settings : new TimeOutSettings(settings);
    }
    
    /**
     * @public
     *
     * @description Starts the process.
     *
     * @return { void }
     **/
    start()
    {
        setTimeout(this.getHandler(), this.getTimeout());
    }
    
    /**
     * @public
     *
     * @description Stops the process.
     *
     * @return { void }
     **/
    stop()
    {
        clearTimeout(this._timeoutId);
    }
    
    /**
     * @public
     *
     * @description Restarts the process.
     *
     * @return { void }
     **/
    restart()
    {
        this.stop();
        
        this.start();
    }
    
    /**
     * @public
     *
     * @description Continues or stops process by the specified force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    continue(force)
    {
        force ? this.start() : this.stop();
    }
    
    /**
     * @public
     *
     * @description Returns number of timeout.
     *
     * @return { number }
     **/
    getTimeout()
    {
        return this._settings.timeout;
    }
    
    /**
     * @public
     *
     * @description Returns handler.
     *
     * @return { Function }
     **/
    getHandler()
    {
        return this._settings.handler;
    }
    
    /**
     * @public
     *
     * @description Returns id.
     *
     * @return { string }
     **/
    getId()
    {
        return this._settings.id;
    }
}
