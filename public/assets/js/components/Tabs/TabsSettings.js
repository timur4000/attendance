import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';
import { TabsSizesClassifier } from './Standards/TabsSizesClassifier.js';
import { TabsThemesClassifier } from './Standards/TabsThemesClassifier.js';


/**
 * @class
 *
 * @description Contains all possible settings of the Tabs component.
 **/
export class TabsSettings
{
    /**
     * @typedef { Object } TabsSetting
     *
     * @property { string } [id]
     *
     * @property { TabsThemesClassifier } [theme]
     *
     * @property { TabsSizesClassifier } [size]
     *
     * @property { string } [domElementClassName]
     *
     * @property { string } [domPanelClassName]
     *
     * @property { string } [domButtonClassName]
     *
     * @property { string } [domContentClassName]
     *
     * @property { Array<ButtonSettingProperties> } [tabsButtonSettings]
     *
     * @property { string } [domViewClassName]
     *
     * @property { boolean } [withStorage]
     *
     * @property { string } [tabIdentifierName]
     **/
    
    /**
     * @public
     *
     * @type { string }
     **/
    id;
    
    /**
     * @public
     *
     * @type { TabsThemesClassifier }
     **/
    theme = TabsThemesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { TabsSizesClassifier }
     **/
    size = TabsSizesClassifier.DEFAULT;
    
    /**
     * @readonly
     *
     * @public
     *
     * @type { Array<string> }
     **/
    modifiers = [ 'theme', 'size' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    domElementClassName = 'tabs';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPanelClassName = 'tabs__panel';
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    domButtonClassName = [ 'tabs__button' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    domContentClassName = 'tabs-content';
    
    /**
     * @public
     *
     * @type { Array<TabsButtonSetting> }
     **/
    tabsButtonSettings = [];
    
    /**
     * @public
     *
     * @type { string }
     **/
    domViewClassName = 'tabs-content__view';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withStorage = true;
    
    /**
     * @public
     *
     * @type { string }
     **/
    tabIdentifierName = 'data-id';
    
    /**
     * @constructor
     *
     * @param { TabsSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
