import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


export class NotificationsSettings
{
    /**
     * @typedef { Object } NotificationSettingProperties
     *
     * @property { number } start - The start position for the displaying.
     *
     * @property { number } edgeStart - The edge start position for the displaying.
     *
     * @property { number } margin - The margin for the items.
     *
     * @property { number } showQuantity - The quantity for the displaying.
     *
     * @property { number } showTime - The time of the displaying (ms).
     **/
    
    /**
     * @public
     *
     * @type { number }
     **/
    start = 20;
    
    /**
     * @public
     *
     * @type { number }
     **/
    edgeStart = 20;
    
    /**
     * @public
     *
     * @type { number }
     **/
    margin = 15;
    
    /**
     * @public
     *
     * @type { number }
     **/
    showQuantity = 5;
    
    /**
     * @public
     *
     * @type { number }
     **/
    showTime = 3000;
    
    /**
     * @constructor
     *
     * @param { NotificationSettingProperties } settings
     *
     * @return { NotificationsSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
