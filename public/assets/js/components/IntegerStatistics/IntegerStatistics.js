import { IntegerStatisticsSettings }            from './IntegerStatisticsSettings.js';
import { createElement }                        from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { LibraryChars }                         from '../../tea-modules/Classes/Standards/Chars/LibraryChars.js';
import { createText }                           from '../../tea-modules/Functions/DOM/Elements/createText.js';
import { IntegerStatisticsTypesClassifier }     from './Standards/IntegerStatisticsTypesClassifier.js';
import { HttpRequest }                          from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { IntegerStatisticsStatesClassifier }    from './Standards/IntegerStatisticsStatesClassifier.js';
import { createSvgElement }                     from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { toggleClass }                          from '../../tea-modules/Functions/DOM/Elements/toggleClass.js';
import { setClasses }                           from '../../tea-modules/Functions/DOM/Elements/setClasses.js';
import { hasClass }                             from '../../tea-modules/Functions/DOM/Elements/hasClass.js';
import { IntegerStatisticsIconTypesClassifier } from './Standards/IntegerStatisticsIconTypesClassifier.js';
import { Button }                               from '../Button/Button.js';
import { ButtonEventsClassifier }               from '../Button/ButtonEventsClassifier.js';
import { CustomEvents }                         from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { IntegerStatisticsEventsClassifier }    from './Standards/IntegerStatisticsEventsClassifier.js';
import { structureValue }                       from '../../tea-modules/Functions/Structures/structureValue.js';
import { convertToShortNumber }                 from '../../tea-modules/Functions/Numbers/convertToShortNumber.js';


/**
 * @description Implements logic of integer-statistics component.
 **/
export class IntegerStatistics
{
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { IntegerStatisticsSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    domHeading;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domValue;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domCurrentSum;
    
    /**
     * @public
     *
     * @type { Text }
     **/
    domCurrentSumValue ;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domPercents ;
    
    /**
     * @public
     *
     * @type { Text }
     **/
    domPercentsValue ;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domDescription;
    
    /**
     * @public
     *
     * @type { Text }
     **/
    domDescriptionText;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domSecondSum;
    
    /**
     * @public
     *
     * @type { Text }
     **/
    domSecondSumValue ;
    
    /**
     * @public
     *
     * @type { ResponseStandard }
     **/
    response ;
    
    /**
     * @private
     *
     * @type { number }
     **/
    _currentValue  = 0;
    
    /**
     * @private
     *
     * @type { number }
     **/
    _percentsValue = 0;
    
    /**
     * @private
     *
     * @type { number }
     **/
    _secondValue  = 0;
    
    /**
     * @private
     *
     * @type { Button }
     **/
    _externalButton;
    
    /**
     * @constructor
     *
     * @param { IntegerStatisticsSetting | IntegerStatisticsSettings } settings
     **/
    constructor(settings = {})
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings instanceof IntegerStatisticsSettings ? settings : new IntegerStatisticsSettings(settings);
     
        this._nodesProcessing();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.setModifier(IntegerStatisticsStatesClassifier.REVERSE, this.settings.isReverse);
        
        this.setModifier(IntegerStatisticsStatesClassifier.WITH_EXTERNAL, this.settings.withExternalButtonSettings);
    }
    
    /**
     * @private
     *
     * @description Implements process of the nodes.
     *
     * @return { void }
     **/
    _nodesProcessing()
    {
        this.domSecondSumValue = this._createTextNode(this.getValue(this._secondValue));
        
        this.domSecondSum = this._createDomSum(this.domSecondSumValue, IntegerStatisticsTypesClassifier.SECOND);
        
        this.domDescriptionText = this._createTextNode(this.settings.descriptionText);
        
        this.domDescription = this._createDomDescription();
        
        this.domPercentsValue = this._createTextNode(this._percentsValue.toString());
        
        this.domPercents = this._createDomPercents();
        
        this.domCurrentSumValue = this._createTextNode(this.getValue(this._currentValue));
        
        this.domCurrentSum = this._createDomSum(this.domCurrentSumValue, IntegerStatisticsTypesClassifier.DEFAULT);
        
        this.domValue = this._createDomValue();
        
        this.domHeading = this._createDomHeading();
        
        this.domElement = this._createDomElement();
        
        this._externalButtonProcessing();
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomElement()
    {
        return createElement('div', { class: this.addModifiersToString(this.settings.domElementClassName, this.settings.type) }, [ this.domHeading, this.domValue, this.domDescription ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom heading element.
     *
     * @return { HTMLHeadingElement }
     **/
    _createDomHeading()
    {
        return createElement('h3', { class: this.settings.domHeadingClassName }, [ this.settings.heading ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom value element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomValue()
    {
        return createElement('div', { class: this.settings.domValueClassName }, [ this.domCurrentSum, this.domPercents ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom percents element.
     *
     * @return { HTMLSpanElement }
     **/
    _createDomPercents()
    {
        const nodes =
                    [
                        this._createDomPercentsSvg(this.settings.domPercentsIndicatorSvgId, IntegerStatisticsIconTypesClassifier.INDICATOR),
                        this._createDomPercentsSvg(this.settings.domPercentsSvgId, IntegerStatisticsIconTypesClassifier.DEFAULT),
                        this.domPercentsValue,
                    ];
        
        return createElement('span', { class: this.addModifiersToString(this.settings.domPercentsClassName, IntegerStatisticsStatesClassifier.NOTHING) }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom percents svg element.
     *
     * @param { string } id
     *
     * @param { IntegerStatisticsIconTypesClassifier } type
     *
     * @return { SVGElement }
     **/
    _createDomPercentsSvg(id, type)
    {
        return createSvgElement(id, { class: this.addModifiersToString(this.settings.domPercentsSvgClassName, type) });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom description element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomDescription()
    {
        return createElement('div', { class: this.settings.domDescriptionClassName }, [ this.domDescriptionText, this.domSecondSum ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom sum element with the specified text and modifiers.
     *
     * @param { Text } value
     *
     * @param { ...string } modifiers
     *
     * @return { HTMLParagraphElement }
     **/
    _createDomSum(value, ...modifiers)
    {
        const nodes = [ value ];
        
        this.settings.isCurrency && nodes.push(this._createDomCurrency());
        
        return createElement('p', { class: this.addModifiersToString(this.settings.domSumClassName, ...modifiers) }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates text node of the specified string.
     *
     * @param { string } string
     *
     * @return { Text }
     **/
    _createTextNode(string)
    {
        return createText(string);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the currency element.
     *
     * @return { Text }
     **/
    _createDomCurrency()
    {
        return createElement('span', { class: this.settings.domCurrencyClassName }, [ this.settings.currency ]);
    }
    
    /**
     * @private
     *
     * @description Implements process of the external button component.
     *
     * @return { void }
     **/
    _externalButtonProcessing()
    {
        if (!this.settings.withExternalButtonSettings)
        {
            return ;
        }
        
        this._externalButton = new Button(this.settings.externalButtonSettings);
        
        this._externalButton.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._externalButtonClickHandler.bind(this));
        
        this.domElement.append(this._externalButton.getElement());
    }
    
    /**
     * @private
     *
     * @description Implements a click handler for the external button component.
     *
     * @param { PointerEvent } event
     *
     * @param { Button } instance
     *
     * @return { void }
     **/
    _externalButtonClickHandler(event, instance)
    {
        this.customEvents.execute(IntegerStatisticsEventsClassifier.EXTERNAL_BUTTON_CLICK, event, instance, this);
    }
    
    /**
     * @public
     *
     * @description Updates current component.
     *
     * @param { ? ResponseStandard } response
     *
     * @return { void }
     **/
    async update(response = null)
    {
        this.loading(true);
        
        response = response ? response : await IntegerStatistics.request(this.settings.httpRequestSettings);
        
        this.response = response;

        this.updateValues(response);

        this.loading(false);
    }
    
    /**
     * @public
     *
     * @description Updates all values.
     *
     * @param { ResponseStandard } response
     *
     * @return { void }
     **/
    updateValues(response)
    {
        this.currentValue = structureValue(response, this.settings.currentValueKey, 0);
        
        this.secondValue = structureValue(response, this.settings.secondValueKey, 0);

        if (!this.settings.percentsValueKey)
        {
            this.percentsValue = this._calculatePercentValue(this.currentValue, this.secondValue);
        }
    }
    
    /**
     * @public
     *
     * @description Calculates percent value by two specified values.
     *
     * @param { number } currentValue
     *
     * @param { number } previousValue
     *
     * @return { number }
     **/
    _calculatePercentValue(currentValue, previousValue)
    {
        if (previousValue === 0)
        {
            return currentValue !== 0 ? 100 : 0;
        }
        
        let division = previousValue ? previousValue : currentValue;
        
        return ((currentValue - previousValue) / division) * 100;
    }
    
    /**
     * @public
     *
     * @description Implements request to the get data.
     *
     * @param { HttpRequestSettingProperties } httpRequestSettings
     *
     * @return { Promise<ResponseStandard> }
     **/
    static async request(httpRequestSettings)
    {
        const httpRequest = new HttpRequest(httpRequestSettings);
        
        return httpRequest.execute();
    }
    
    /**
     * @public
     *
     * @description Adds the specified modifier to the specified string.
     *
     * @param { string } string
     *
     * @param { ...string } modifiers
     *
     * @return { string }
     **/
    addModifiersToString(string, ...modifiers)
    {
        return string + LibraryChars.space + modifiers.join(LibraryChars.space);
    }
    
    /**
     * @public
     *
     * @description Sets the specified modifier to the element by the specified force.
     *
     * @param { string } modifier
     *
     * @param { boolean } force
     *
     * @return { boolean }
     **/
    setModifier(modifier, force)
    {
        return toggleClass(this.domElement, modifier, force);
    }
    
    /**
     * @public
     *
     * @description Check if the element contains the specified modifier.
     *
     * @param { string } modifier
     *
     * @return { boolean }
     **/
    hasModifier(modifier)
    {
        return hasClass(this.domElement, modifier);
    }
    
    /**
     * @public
     *
     * @description Returns dom element.
     *
     * @return { HTMLDivElement }
     **/
    getElement()
    {
        return this.domElement;
    }
    
    /**
     * @public
     *
     * @description Returns specified value in '0.00' or '0' format.
     *
     * @param { number } value
     *
     * @return { string }
     **/
    getValue(value)
    {
        return this.settings.isFloat ? value.toFixed(2) : value.toFixed(0);
    }
    
    /**
     * @public
     *
     * @description Sets the specified classes to the dom element.
     *
     * @param { ...string } tokens
     *
     * @return { void }
     **/
    setClasses(...tokens)
    {
        setClasses(this.domElement, tokens);
    }
    
    /**
     * @public
     *
     * @return { number }
     **/
    get currentValue()
    {
        return this._currentValue;
    }
    
    /**
     * @public
     *
     * @param { number } value
     *
     * @return { void }
     **/
    set currentValue(value)
    {
        this._currentValue = value;
        
        this.domCurrentSumValue.textContent = this.getValue(value);
    }
    
    /**
     * @public
     *
     * @return { number }
     **/
    get percentsValue()
    {
        return this._percentsValue;
    }
    
    /**
     * @public
     *
     * @param { number } value
     *
     * @return { void }
     **/
    set percentsValue(value)
    {
        this._percentsValue = value;
        
        toggleClass(this.domPercents, IntegerStatisticsStatesClassifier.NOTHING, value === 0);
        
        toggleClass(this.domPercents, IntegerStatisticsStatesClassifier.SUCCESS, value > 0);
        
        toggleClass(this.domPercents, IntegerStatisticsStatesClassifier.ALERT, value < 0);
        
        this.domPercentsValue.textContent = convertToShortNumber(Math.abs(value), 2) + '%';
    }
    
    /**
     * @public
     *
     * @return { number }
     **/
    get secondValue()
    {
        return this._secondValue;
    }
    
    /**
     * @public
     *
     * @param { number } value
     *
     * @return { void }
     **/
    set secondValue(value)
    {
        this._secondValue = value;
        
        this.domSecondSumValue.textContent = this.getValue(value);
    }
    
    /**
     * @public
     *
     * @description Sets the loading state by the specified force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    loading(force)
    {
        this.setModifier(IntegerStatisticsStatesClassifier.LOADING, force);
    }
}
