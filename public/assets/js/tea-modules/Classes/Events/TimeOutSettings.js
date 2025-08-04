import { structureMerge } from '../../Functions/Structures/structureMerge.js';


/**
 * @description Contains all possible settings of the TimeOut class.
 **/
export class TimeOutSettings
{
    /**
     * @typedef { Object } TimeOutSetting
     *
     * @property { number } timeout
     *
     * @property { Function } handler
     *
     * @property { number } [id]
     **/
    
    /**
     * @public
     *
     * @type { number }
     **/
    timeout;
    
    /**
     * @public
     *
     * @type { Function }
     **/
    handler;
    
    /**
     * @public
     *
     * @type { string | number }
     **/
    id;
    
    /**
     * @constructor
     *
     * @param { TimeOutSetting } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
