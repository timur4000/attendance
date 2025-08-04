import { structureMerge }                   from '../../tea-modules/Functions/Structures/structureMerge.js';
import { IntegerStatisticsTypesClassifier } from './Standards/IntegerStatisticsTypesClassifier.js';


/**
 * @description Contains all possible settings of the IntegerStatistics component.
 **/
export class IntegerStatisticsSettings
{
    /**
     * @typedef { Object } IntegerStatisticsSetting
     *
     * @property { ? HttpRequestSettingProperties } [httpRequestSettings]
     *
     * @property { ? string } [currentValueKey]
     *
     * @property { ? string } [percentsValueKey]
     *
     * @property { ? string } [secondValueKey]
     *
     * @property { ? IntegerStatisticsTypesClassifier } [type]
     *
     * @property { ? string } [heading]
     *
     * @property { ? string } [descriptionText]
     *
     * @property { ? boolean } [isFloat]
     *
     * @property { ? boolean } [isCurrency]
     *
     * @property { ? boolean } [isReverse]
     *
     * @property { ? string } [currency]
     *
     * @property { ? string } [domElementClassName]
     *
     * @property { ? string } [domHeadingClassName]
     *
     * @property { ? string } [domValueClassName]
     *
     * @property { ? string } [domSumClassName]
     *
     * @property { ? string } [domPercentsClassName]
     *
     * @property { ? string } [domDescriptionClassName]
     *
     * @property { ? string } [domCurrencyClassName]
     *
     * @property { ? boolean } [withExternalButtonSettings]
     *
     * @property { ? ButtonSettingProperties } [externalButtonSettings]
     **/
    
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
    currentValueKey = '';
    
    /**
     * @public
     *
     * @type { string | null }
     **/
    percentsValueKey = null;
    
    /**
     * @public
     *
     * @type { string }
     **/
    secondValueKey = '';
    
    /**
     * @public
     *
     * @type { IntegerStatisticsTypesClassifier }
     **/
    type = IntegerStatisticsTypesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { string }
     **/
    heading = 'Default heading';
    
    /**
     * @public
     *
     * @type { string }
     **/
    descriptionText = 'vs last:';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isFloat = true;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isCurrency = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isReverse = false;
    
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
    domElementClassName = 'integer-statistics integer-statistics--size-default integer-statistics--theme-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domHeadingClassName = 'integer-statistics__heading integer-statistics__heading--size-default integer-statistics__heading--theme-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domValueClassName = 'integer-statistics__value integer-statistics__value--type-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domSumClassName = 'integer-statistics__sum integer-statistics__sum--theme-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPercentsClassName = 'integer-statistics__percents integer-statistics__percents--size-default integer-statistics__percents--theme-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPercentsSvgClassName = 'integer-statistics__percents-icon icon icon-size-14';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPercentsSvgId = 'essential-minus';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domPercentsIndicatorSvgId = 'chevron-up';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domDescriptionClassName = 'integer-statistics__description integer-statistics__description--size-default integer-statistics__description--theme-default';
    
    /**
     * @public
     *
     * @type { string }
     **/
    domCurrencyClassName = 'integer-statistics__currency currency currency--size-small';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withExternalButtonSettings = false;
    
    /**
     * @public
     *
     * @type { ButtonSettingProperties }
     **/
    externalButtonSettings =
        {
            elementClass: [ 'integer-statistics__external-button', 'button', 'button--size-small', 'button--type-default', 'button--theme-white-azure-wild-sand' ],
            iconId: 'system-external-link-fill',
            iconClass: 'icon icon-size-14',
        };
    
    /**
     * @constructor
     *
     * @param { IntegerStatisticsSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
