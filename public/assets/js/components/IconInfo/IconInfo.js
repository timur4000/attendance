import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { LibraryChars }  from '../../tea-modules/Classes/Standards/Chars/LibraryChars.js';
import { createSvgElement } from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { HttpRequest } from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { IconInfoModifiersClassifier } from './Standards/IconInfoModifiersClassifier.js';


/**
 * Implements logic of the icon-info component.
 **/
export class IconInfo
{
    /**
     * @public
     *
     * @type { IconInfoSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domWrapper;
    
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
    domIcon;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domInfo;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domLabel;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement }
     **/
    domValue;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domInnerValue;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    domCurrency;
    
    /**
     * @private
     *
     * @type { string }
     **/
    _value = '';
    
    /**
     * @constructor
     *
     * @param { IconInfoSettings } settings
     **/
    constructor(settings)
    {
        this.settings = settings;
        
        this.settings.wrapper && (this.domWrapper = querySelector(this.settings.wrapper));
        
        this.domIcon = this._createIcon();
        
        this.domLabel = this._createLabel();
        
        this.domValue = this._createValue();
        
        this.domInfo = this._createInfo();
        
        this.domElement = this._createElement();
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
        this.domWrapper && this.domWrapper.append(this.domElement);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.elementClassName) }, [ this.domIcon, this.domInfo ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the icon.
     *
     * @return { HTMLDivElement }
     **/
    _createIcon()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.iconClassName) }, [ this._createIconSvg() ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the icon svg.
     *
     * @return { SVGElement }
     **/
    _createIconSvg()
    {
        return createSvgElement(this.settings.iconSvgId, { class: this.settings.iconSvgClassName });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the info.
     *
     * @return { HTMLDivElement }
     **/
    _createInfo()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.infoClassName) }, [ this.domLabel, this.domValue ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the label.
     *
     * @return { HTMLParagraphElement }
     **/
    _createLabel()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.labelClassName) }, [ this.settings.label ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the value.
     *
     * @return { HTMLParagraphElement }
     **/
    _createValue()
    {
        const nodes = [];
        
        nodes.push(this.domInnerValue = this._createInnerValue());
        
        if (this.settings.isCurrency)
        {
            nodes.push(this.domCurrency = this._createCurrency());
        }
        
        return createElement('div', { class: this._modifiersProcessing(this.settings.valueClassName) }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the inner value.
     *
     * @return { HTMLSpanElement }
     **/
    _createInnerValue()
    {
        return createElement('span', { class: this.settings.innerValueClassName }, [ this.settings.defaultValue ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the info.
     *
     * @return { HTMLSpanElement }
     **/
    _createCurrency()
    {
        return createElement('span', { class: this.settings.currencyClassName }, [ this.settings.currency ]);
    }
    
    /**
     * @private
     *
     * @description Implements adding the specified modifier from classifier to the specified string.
     *
     * @param { string } string
     *
     * @param { string ? } baseString
     *
     * @return { string }
     **/
    _modifiersProcessing(string, baseString)
    {
        if (!baseString)
        {
            baseString = string;
        }
        
        for (let i = 0, n = this.settings.modifiers.length; i < n; i++)
        {
            const modifier = this.settings.modifiers[ i ];
            
            string += LibraryChars.space + baseString + LibraryChars.BEMModifier + modifier + '-' + this.settings[ modifier ];
        }
        
        return string;
    }
    
    /**
     * @public
     *
     * @description Implements a request to obtain data from the server.
     *
     * @return { Promise<ResponseStandard> }
     **/
    async request()
    {
        const request = new HttpRequest(this.settings.httpRequestSettings);
        
        return request.execute();
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
    async update(response = undefined)
    {
        this.setModifier(IconInfoModifiersClassifier.LOADING, true);
        
        const request = response ? response : await this.request();
        
        this._value_update(request);
        
        this.setModifier(IconInfoModifiersClassifier.LOADING, false);
    }
    
    /**
     * @public
     *
     * @description Updates the value of the current component by the specified record.
     *
     * @param { Object } record
     *
     * @return { void }
     **/
    _value_update(record)
    {
        this.value = record[ this.settings.requestDataVariable ][ this.settings.property ] || this.settings.defaultValue;
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to the element by the given force.
     *
     * @param { IconInfoModifiersClassifier } modifier
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setModifier(modifier, force)
    {
        this.domElement.classList.toggle(modifier, force);
    }
    
    /**
     * @public
     *
     * @description Check if the element contains the given modifier.
     *
     * @param { IconInfoModifiersClassifier } modifier
     *
     * @return { void }
     **/
    hasModifier(modifier)
    {
        this.domElement.classList.contains(modifier);
    }
    
    /**
     * @public
     *
     * @return { string }
     **/
    get value()
    {
        return this._value;
    }
    
    /**
     * @public
     *
     * @return { void }
     **/
    set value(value)
    {
        this._value = value;
        
        this.domInnerValue.textContent = this.value;
    }
}
