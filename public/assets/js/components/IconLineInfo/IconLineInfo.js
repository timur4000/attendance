import { IconLineInfoSettings }         from './IconLineInfoSettings.js';
import { createElement }                from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createSvgElement }             from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { createText }                   from '../../tea-modules/Functions/DOM/Elements/createText.js';
import { toggleClass }                  from '../../tea-modules/Functions/DOM/Elements/toggleClass.js';
import { IconLineInfoStatesClassifier } from './Standards/IconLineInfoStatesClassifier.js';
import { HttpRequest }                  from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { structureValue }               from '../../tea-modules/Functions/Structures/structureValue.js';
import { HttpStatusesClassifier }       from '../../tea-modules/Classes/Requests/Standards/HttpStatusesClassifier.js';
import { convertToShortNumber }         from '../../tea-modules/Functions/Numbers/convertToShortNumber.js';


/**
 * @description Implements logic of the IconLineInfo component.
 **/
export class IconLineInfo
{
    /**
     * @public
     *
     * @type { IconLineInfoSettings }
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
     * @type { HTMLDivElement }
     **/
    domUpper;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domUpperIcon;
    
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
    domLower;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domSummary;
    
    /**
     * @public
     *
     * @type { Text }
     **/
    domSummaryValue;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domDescription;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domPercents;
    
    /**
     * @public
     *
     * @type { Text }
     **/
    domPercentsValue;
    
    /**
     * @private
     *
     * @readonly
     *
     * @type { number }
     **/
    _value = 0;
    
    /**
     * @private
     *
     * @readonly
     *
     * @type { number }
     **/
    _percentsValue = 0;
    
    /**
     * @private
     *
     * @readonly
     *
     * @type { number }
     **/
    _secondValue = 0;
    
    /**
     * @public
     *
     * @type { ResponseStandard }
     **/
    response;
    
    /**
     * @constructor
     *
     * @param { IconLineInfoSetting | IconLineInfoSettings } settings
     **/
    constructor(settings = {})
    {
        this.settings = settings instanceof IconLineInfoSettings ? settings : new IconLineInfoSettings(settings);
        
        this._nodesProcessing();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization() {}
    
    /**
     * @private
     *
     * @description Implements process of the html nodes.
     *
     * @return { void }
     **/
    _nodesProcessing()
    {
        if (this.settings.withPercents)
        {
            this.domPercentsValue = createText('');
            
            this.domPercents = this._createDomPercents();
            
            this.percentsValue = this.settings.differenceDefaultValue;
        }
        
        this.domDescription = this._createDomDescription();
        
        this.domSummaryValue = createText('');
        
        this.domSummary = this._createDomSummary();
        
        this.domLower = this._createDomLower();
        
        this.domHeading = this._createDomHeading();
        
        this.domUpperIcon = this._createDomUpperIcon();
        
        this.domUpper = this._createDomUpper();
        
        this.domElement = this._createDomElement();
        
        this.value = this.settings.defaultValue;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the main dom element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomElement()
    {
        const div = createElement('div', { class: this.settings.domElementClassName }, [ this.domUpper, this.domLower ]);
        
        this.settings.modifiers.forEach(modifier => toggleClass(div, this.settings.domElementClassName + '--' + modifier + '-' + this.settings[ modifier ]));
        
        return div;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom upper element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomUpper()
    {
        return createElement('div', { class: this.settings.domUpperClassName }, [ this.domUpperIcon, this.domHeading ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom upper icon element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomUpperIcon()
    {
        return createElement('div', { class: this.settings.domUpperIconClassName }, [ this._createDomSvg(this.settings.domUpperIconSvgId, this.settings.domUpperIconSvgClassName) ]);
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
     * @description Creates html node of the dom lower element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomLower()
    {
        return createElement('div', { class: this.settings.domLowerClassName }, [ this.domSummary, this.domDescription ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom summary element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomSummary()
    {
        const nodes = [ this.domSummaryValue ];
        
        if (this.settings.isCurrency)
        {
            nodes.push(this._createDomCurrency());
        }
        
        return createElement('div', { class: this.settings.domSummaryClassName }, nodes);
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
        const nodes = [];
        
        if (this.settings.withPercents)
        {
            nodes.push(this.domPercents);
        }
        
        return createElement('div', { class: this.settings.domDescriptionClassName }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom percents element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomPercents()
    {
        return createElement('div', { class: this.settings.domPercentsClassName },
            [
                this._createDomSvg(this.settings.domPercentsFirstSvgId, this.settings.domPercentsFirstSvgClassName),
                this._createDomSvg(this.settings.domPercentsSecondSvgId, this.settings.domPercentsSecondSvgClassName),
                this.domPercentsValue,
            ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom svg element by the specified arguments.
     *
     * @param { string } id
     *
     * @param { string } className
     *
     * @return { SVGElement }
     **/
    _createDomSvg(id, className)
    {
        return createSvgElement(id, { class: className });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom currency element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomCurrency()
    {
        return createElement('div', { class: this.settings.domCurrencyClassName }, [ this.settings.currency ]);
    }
    
    /**
     * @public
     *
     * @description Implements process of the specified number.
     *
     * @param { number } value
     *
     * @return { string }
     **/
    _numberProcessing(value)
    {
        return value.toFixed(this.settings.fractionDigits)
    }
    
    /**
     * @public
     *
     * @description Returns dom element.
     *
     * @return { HTMLDivElement }
     **/
    getDomElement()
    {
        return this.domElement;
    }
    
    /**
     * @public
     *
     * @description Implements request for data.
     *
     * @param { HttpRequestSettingProperties } httpRequestSettings
     *
     * @return { ResponseStandard }
     **/
    static async request(httpRequestSettings)
    {
        const httpRequest = new HttpRequest(httpRequestSettings);
        
        const response = await httpRequest.execute();
        
        if (response.status !== HttpStatusesClassifier.SUCCESS)
        {
            app.notifications.error('Error', [ response.message ]);
            
            return null;
        }
        
        return response;
    }
    
    /**
     * @public
     *
     * @description Updates component.
     *
     * @param { ResponseStandard ? } response
     *
     * @return { void }
     **/
    async update(response)
    {
        this.loading(true);

        response = response ? response : await IconLineInfo.request(this.settings.httpRequestSettings);
        
        this.response = response;
        
        if (response)
        {
            this.update_values(response);
        }

        this.loading(false);
    }
    
    /**
     * @public
     *
     * @description Updates values of component by the specified response.
     *
     * @param { ResponseStandard } response
     *
     * @return { void }
     **/
    update_values(response)
    {
        this.value = structureValue(response, this.settings.valueKey, 0);
        
        this.secondValue = structureValue(response, this.settings.secondValueKey, 0);
        
        if (!this.settings.withPercents)
        {
            return ;
        }
        
        if (!this.settings.percentsKey)
        {
            this.percentsValue = this._calculatePercentValue(this.value, this.secondValue);
        }
        else
        {
            this.percentsValue = structureValue(response, this.settings.percentsKey, 0);
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
     * @description Sets the loading state by the specified force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    loading(force)
    {
        toggleClass(this.domElement, IconLineInfoStatesClassifier.LOADING, force);
    }
    
    /**
     * @public
     *
     * @return { number }
     **/
    get value()
    {
        return this._value;
    }
    
    /**
     * @public
     *
     * @param { number } value
     *
     * @return { void }
     **/
    set value(value)
    {
        this._value = value;
        
        this.domSummaryValue.textContent = this._numberProcessing(value);
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
        toggleClass(this.domPercents, IconLineInfoStatesClassifier.NOTHING, value === 0);
        
        toggleClass(this.domPercents, IconLineInfoStatesClassifier.INCREASE, value > 0);
        
        toggleClass(this.domPercents, IconLineInfoStatesClassifier.DECREASE, value < 0);
        
        this._percentsValue = value;
        
        this.domPercentsValue.textContent = convertToShortNumber(value, this.settings.fractionDigits) + '%';
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
    }
}
