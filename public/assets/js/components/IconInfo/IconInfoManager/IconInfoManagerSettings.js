import { structureMerge } from '../../../tea-modules/Functions/Structures/structureMerge.js';
import { IconInfoTypesClassifier } from '../Standards/IconInfoTypesClassifier.js';


/**
 * @description Contains all possible settings of the IconInfoManager class.
 **/
export class IconInfoManagerSettings
{
    /**
     * @typedef { Object } IconInfoManagerSetting
     *
     * @property { ? IconInfoTypesClassifier } [type]
     *
     * @property { ? string } [defaultValue]
     *
     * @property { ? boolean } [isCurrency]
     *
     * @property { string | HTMLElement } [wrapper]
     *
     * @property { ? string } [countCssVariable]
     *
     * @property { Array<IconInfoSetting> } [items]
     *
     * @property { ? HttpRequestSettingProperties } [httpRequestSettings]
     *
     * @property { ? string } [requestDataVariable]
     **/
    
    /**
     * @public
     *
     * @type { IconInfoTypesClassifier }
     **/
    type = IconInfoTypesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isCurrency = true;
    
    /**
     * @public
     *
     * @type { string }
     **/
    defaultValue = '0';
    
    /**
     * @public
     *
     * @type { string | HTMLElement }
     **/
    wrapper;
    
    /**
     * @public
     *
     * @type { string }
     **/
    wrapperClassName = 'icon-info-wrapper';
    
    /**
     * @public
     *
     * @type { string }
     **/
    countCssVariable = 'icon-info-count';
    
    /**
     * @public
     *
     * @type { Array<IconInfoSetting> }
     **/
    items= [];
    
    /**
     * @public
     *
     * @type { HttpRequestSettingProperties }
     **/
    httpRequestSettings= {};
    
    /**
     * @public
     *
     * @type { string }
     **/
    requestDataVariable = 'data';
    
    /**
     * @constructor
     *
     * @param { IconInfoManagerSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
