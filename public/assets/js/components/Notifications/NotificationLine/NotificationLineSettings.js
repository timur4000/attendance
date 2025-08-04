import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @class
 *
 * @description Contains all possible settings of the NotificationLine class.
 **/
export class NotificationLineSettings
{
    /**
     * @typedef { Object } NotificationLineSettingProperties
     *
     * @property { string ? } elementClass - The class name of the element.
     *
     * @property { string } type - The type of the element.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'notification-line';
    
    /**
     * @public
     *
     * @type { NotificationLineTypesClassifier }
     **/
    type;
    
    /**
     * @constructor
     *
     * @param { NotificationLineSettingProperties } settings
     *
     * @return { NotificationLineSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
