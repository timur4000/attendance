import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';
import { IconInfoThemesClassifier } from './Standards/IconInfoThemesClassifier.js';
import { IconInfoSizesClassifier } from './Standards/IconInfoSizesClassifier.js';
import { IconInfoTypesClassifier } from './Standards/IconInfoTypesClassifier.js';


/**
 * @description Contains all possible settings of the IconInfo component.
 **/
export class IconInfoSettings
{
    /**
     * @typedef { Object } IconInfoSetting
     *
     * @property { ? (string | HTMLElement) } [wrapper]
     *
     * @property { ? IconInfoSizesClassifier } [size]
     *
     * @property { ? IconInfoThemesClassifier } [theme]
     *
     * @property { ? IconInfoTypesClassifier } [type]
     *
     * @property { string } label
     *
     * @property { ? string } [property]
     *
     * @property { ? string } [defaultValue]
     *
     * @property { ? HttpRequestSettingProperties } [httpRequestSettings]
     *
     * @property { ? string } [requestDataVariable]
     *
     * @property { ? string } [elementClassName]
     *
     * @property { ? string } [iconClassName]
     *
     * @property { ? string } [iconSvgClassName]
     *
     * @property { string } iconSvgId
     *
     * @property { ? string } [infoClassName]
     *
     * @property { ? string } [labelClassName]
     *
     * @property { ? string } [valueClassName]
     *
     * @property { ? string } [innerValueClassName]
     *
     * @property { ? string } [currencyClassName]
     *
     * @property { ? string } [currency]
     *
     * @property { ? boolean } [isCurrency]
     **/
    
    /**
     * @public
     *
     * @type { string | HTMLElement }
     **/
    wrapper = '';
    
    /**
     * @public
     *
     * @type { IconInfoSizesClassifier }
     **/
    size = IconInfoSizesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { IconInfoThemesClassifier }
     **/
    theme = IconInfoThemesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { IconInfoTypesClassifier }
     **/
    type = IconInfoTypesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { string }
     **/
    label = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    property = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    defaultValue = '--';
    
    /**
     * @public
     *
     * @type { HttpRequestSettingProperties }
     **/
    httpRequestSettings = {};
    
    /**
     * @public
     *
     * @type { string }
     **/
    requestDataVariable = 'data';
    
    /**
     * @public
     *
     * @readonly
     *
     * @type { [ 'size', 'theme', 'type' ] }
     **/
    modifiers = [ 'size', 'theme', 'type' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClassName = 'icon-info';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconClassName = 'icon-info__icon';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconSvgClassName = 'icon icon-size-20';
    
    /**
     * @public
     *
     * @type { string }
     **/
    iconSvgId = 'money-wallet';
    
    /**
     * @public
     *
     * @type { string }
     **/
    infoClassName = 'icon-info__info';
    
    /**
     * @public
     *
     * @type { string }
     **/
    labelClassName = 'icon-info__label';
    
    /**
     * @public
     *
     * @type { string }
     **/
    valueClassName = 'icon-info__value';
    
    /**
     * @public
     *
     * @type { string }
     **/
    innerValueClassName = 'icon-info__inner-value';
    
    /**
     * @public
     *
     * @type { string }
     **/
    currencyClassName = 'currency currency--size-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    currency = 'TMT';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isCurrency = false;
    
    /**
     * @constructor
     *
     * @param { ? IconInfoSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
