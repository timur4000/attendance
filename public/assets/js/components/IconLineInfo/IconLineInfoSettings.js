import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';
import { IconLineInfoThemesClassifier } from './Standards/IconLineInfoThemesClassifier.js';
import { IconLineInfoTypesClassifier } from './Standards/IconLineInfoTypesClassifier.js';
import { IconLineInfoSizesClassifier } from './Standards/IconLineInfoSizesClassifier.js';


/**
 * @description Contains all possible settings of the IconLineInfo component.
 **/
export class IconLineInfoSettings
{
    /**
     * @typedef { Object } IconLineInfoSetting
     *
     * @property { ? HttpRequestSettingProperties } [httpRequestSettings]
     *
     * @property { IconLineInfoTypesClassifier } [type]
     *
     * @property { IconLineInfoThemesClassifier } [theme]
     *
     * @property { IconLineInfoSizesClassifier } [size]
     *
     * @property { ? string } [valueKey]
     *
     * @property { ? string } [differenceKey]
     *
     * @property { ? string } [secondValueKey]
     *
     * @property { ? string } [domElementClassName]
     *
     * @property { ? string } [domUpperClassName]
     *
     * @property { ? string } [domUpperIconClassName]
     *
     * @property { ? string } [domUpperIconSvgId]
     *
     * @property { ? string } [domUpperIconSvgClassName]
     *
     * @property { ? string } [heading]
     *
     * @property { ? string } [domHeadingClassName]
     *
     * @property { ? string } [domLowerClassName]
     *
     * @property { ? number } [defaultValue]
     *
     * @property { ? number } [differenceDefaultValue]
     *
     * @property { ? boolean } [isCurrency]
     *
     * @property { ? number } [domSummaryClassName]
     *
     * @property { ? number } [domCurrencyClassName]
     *
     * @property { ? number } [currency]
     *
     * @property { ? number } [domDescriptionClassName]
     *
     * @property { ? number } [domPercentClassName]
     *
     * @property { ? number } [domPercentFirstSvgId]
     *
     * @property { ? number } [domPercentFirstSvgClassName]
     *
     * @property { ? number } [domPercentSecondSvgId]
     *
     * @property { ? number } [domPercentSecondSvgClassName]
     *
     * @property { ? number } [fractionDigits]
     *
     * @property { ? boolean } [withPercents]
     **/
    
    /**
     * @public
     *
     * @type { IconLineInfoTypesClassifier }
     **/
    type = IconLineInfoTypesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { IconLineInfoThemesClassifier }
     **/
    theme = IconLineInfoThemesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { IconLineInfoSizesClassifier }
     **/
    size = IconLineInfoSizesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @readonly
     *
     * @type { Array<string> }
     **/
    modifiers = [ 'type', 'theme', 'size' ];
    
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
    valueKey = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    percentsKey = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    secondValueKey = '';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domElementClassName = 'icon-line-info';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domUpperClassName = 'icon-line-info__upper';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domUpperIconClassName = 'icon-line-info__icon';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domUpperIconSvgId = 'money-wallet';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domUpperIconSvgClassName = 'icon icon-size-16';
    
    /**
     * @public
     *
     * @type { string }
     **/
    heading = '--';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domHeadingClassName = 'icon-line-info__heading';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domLowerClassName = 'icon-line-info__lower';
    
    /**
     * @public
     *
     * @type { number }
     **/
    defaultValue = 0;
    
    /**
     * @public
     *
     * @type { number }
     **/
    differenceDefaultValue = 0;
    
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
    domSummaryClassName = 'icon-line-info__summary';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domCurrencyClassName = 'icon-line-info__currency currency currency--size-small';
    
    /**
     * @public
     *
     * @type { string }
     **/
    currency = 'TMT';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domDescriptionClassName = 'icon-line-info__description';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPercentsClassName = 'icon-line-info__difference';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPercentsFirstSvgId = 'essential-minus';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPercentsFirstSvgClassName = 'icon-line-info__difference-icon default icon icon-size-16';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPercentsSecondSvgId = 'chevron-up';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPercentsSecondSvgClassName = 'icon-line-info__difference-icon indicator icon icon-size-16';
    
    /**
     * @public
     *
     * @type { number }
     **/
    fractionDigits = 2;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withPercents = true;
    
    /**
     * @constructor
     *
     * @param { IconLineInfoSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
