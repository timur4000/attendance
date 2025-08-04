import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the NotificationColumn class.
 **/
export class NotificationColumnSettings
{
    /**
     * @typedef { Object } NotificationColumnSettingProperties
     *
     * @property { string ? } elementClass - THe class name of the element.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'notification-column';
    
    /**
     * @constructor
     *
     * @param { NotificationColumnSettingProperties } settings
     *
     * @return { NotificationColumnSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
