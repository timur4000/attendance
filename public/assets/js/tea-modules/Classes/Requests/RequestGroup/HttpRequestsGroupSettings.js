import { structureMerge } from '../../../Functions/Structures/structureMerge.js';


/**
 * @description Contains all possible settings of the RequestGroup class.
 **/
export class HttpRequestsGroupSettings
{
    /**
     * @typedef { Object } HttpRequestsGroupSetting
     *
     * @property { string } [groupName]
     *
     * @property { number } [maxRequests]
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    groupName;
    
    /**
     * @public
     *
     * @type { number }
     **/
    maxRequests = 10;
    
    /**
     * @constructor
     *
     * @param { HttpRequestsGroupSetting } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
