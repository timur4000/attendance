import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { NotificationItemTypesClassifier } from '../Classifiers/NotificationItemTypesClassifier.js';
import { NotificationItemThemesClassifier } from '../Classifiers/NotificationItemThemesClassifier.js';
import { NotificationLineTypesClassifier } from '../Classifiers/NotificationLineTypesClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the NotificationItem class.
 **/
export class NotificationItemSettings
{
    /**
     * @typedef { Object } NotificationItemSettingProperties
     *
     * @property { string ? } elementClass - The class name of the element.
     *
     * @property { string ? } iconClass - The class name of the icon element.
     *
     * @property { string ? } svgClass - The class name of the svg element.
     *
     * @property { string ? } svgId - The id of the svg element.
     *
     * @property { string ? } headingClass - The class name of the heading element.
     *
     * @property { string ? } paragraphClass - The class name of the paragraph element.
     *
     * @property { NotificationItemTypesClassifier ? } type - The type of the element.
     *
     * @property { NotificationItemThemesClassifier ? } theme - The theme of the element.
     *
     * @property { NotificationLineSettingProperties ? } upperLineSettings - The settings of the upper line component.
     *
     * @property { NotificationColumnSettingProperties ? } upperColumnSettings - The settings of the upper column component.
     *
     * @property { NotificationLineSettingProperties ? } lowerLineSettings - The settings of the lower line component.
     *
     * @property { string } heading - The text for displaying in the upper line component.
     *
     * @property { boolean ? } withClose - Determines whether close button is needed.
     *
     * @property { string[] ? } paragraphs - The paragraphs for displaying in the lower line component.
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClass = 'notification-item';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconClass = 'notification-item__icon';
    
    /**
     * @public
     *
     * @type { string }
     **/
    svgClass = 'icon icon-size-20';
    
    /**
     * @public
     *
     * @type { string }
     **/
    svgId;
    
    /**
     * @public
     *
     * @type { string }
     **/
    closeClass = 'notification-item__button';
    
    /**
     * @public
     *
     * @type { string }
     **/
    closeSvgClass = 'icon icon-size-10';
    
    /**
     * @public
     *
     * @type { string }
     **/
    closeSvgId = 'essential-close';
    
    /**
     * @public
     *
     * @type { string }
     **/
    headingClass = 'notification-item__heading';
    
    /**
     * @public
     *
     * @type { string }
     **/
    paragraphClass = 'notification-item__paragraph';
    
    /**
     * @public
     *
     * @type { NotificationItemTypesClassifier }
     **/
    type = NotificationItemTypesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { NotificationItemThemesClassifier }
     **/
    theme = NotificationItemThemesClassifier.NOTHING;
    
    /**
     * @public
     *
     * @type { NotificationLineSettingProperties }
     **/
    upperLineSettings = { type: NotificationLineTypesClassifier.UPPER };
    
    /**
     * @public
     *
     * @type { NotificationColumnSettingProperties }
     **/
    upperColumnSettings = {};
    
    /**
     * @public
     *
     * @type { NotificationLineSettingProperties }
     **/
    lowerLineSettings = { type: NotificationLineTypesClassifier.LOWER };
    
    /**
     * @public
     *
     * @type { string }
     **/
    heading;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withClose = true;
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    paragraphs = [];
    
    /**
     * @constructor
     *
     * @param { NotificationItemSettingProperties } settings
     *
     * @return { NotificationItemSettings }
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
