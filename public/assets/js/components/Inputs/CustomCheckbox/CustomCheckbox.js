import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { setAttribute }  from '../../../tea-modules/Functions/DOM/Attributes/setAttribute.js';
import { createSvgElement } from '../../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { setClasses } from '../../../tea-modules/Functions/DOM/Elements/setClasses.js';
import { CustomEvents } from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { InputEventsClassifier } from '../Standards/InputEventsClassifier.js';


export class CustomCheckbox
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
     * @type { CustomCheckboxSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLInputElement }
     **/
    input;
    
    /**
     * @public
     *
     * @type { HTMLLabelElement }
     **/
    label;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    labelIconOuter;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    labelTextSpan;
    
    /**
     * @constructor
     *
     * @param { CustomCheckboxSettings } settings
     **/
    constructor(settings)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings;
        
        this.input = this._createInput();
        
        this.label = this._createLabel();
        
        this.element = this._createElement();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.input.addEventListener('change', this._changeHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the change event.
     *
     * @param { HTMLInputElement } target
     *
     * @return { void }
     **/
    _changeHandler({ target })
    {
        this.customEvents.execute(InputEventsClassifier.CHANGE, target, this);
    }
    
    /**
     * @public
     *
     * @description Returns name of the input.
     *
     * @param { string } qualifiedName
     *
     * @param { string ? } value
     *
     * @return { void }
     **/
    setAttribute(qualifiedName, value = '')
    {
        setAttribute(this.element, qualifiedName, value);
    }
    
    /**
     * @public
     *
     * @description Returns element.
     *
     * @return { HTMLDivElement }
     **/
    getElement()
    {
        return this.element;
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
        return createElement('div', { class: this.settings.elementClass }, [ this.input, this.label ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the input element.
     *
     * @return { HTMLInputElement }
     **/
    _createInput()
    {
        const input = createElement('input',
            {
                type: 'checkbox',
                class: this.settings.inputClass,
                id: this.settings.inputId,
                name: this.settings.inputName,
                value: this.settings.inputValue,
                hidden: '',
            });
        
        input.checked = this.settings.checked;
        
        return input;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the label element.
     *
     * @return { HTMLLabelElement }
     **/
    _createLabel()
    {
        this.labelIconOuter = this._createLabelIconOuter();
        
        this.labelTextSpan = this._createLabelText();
        
        return createElement('label', { class: this.settings.labelClass, for: this.settings.inputId }, [ this.labelIconOuter, this.labelTextSpan ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the label icon outer element.
     *
     * @return { HTMLSpanElement }
     **/
    _createLabelIconOuter()
    {
        const onIcon = this._createLabelIcon('on');
        
        const offIcon = this._createLabelIcon('off');
        
        return createElement('span', { class: this.settings.labelIconOuterClass }, [ onIcon, offIcon ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the label icon element.
     *
     * @param { 'on' | 'off' } type
     *
     * @return { HTMLSpanElement }
     **/
    _createLabelIcon(type)
    {
        const span = createElement('span', { class: this.settings.labelIconClass + type });
        
        const key = type.replace(/^\w/, a => a.toUpperCase());
        
        const svg = createSvgElement(this.settings[`labelIcon${ key }SvgId`], { class: this.settings[`labelIcon${ key }SvgClass`] });
        
        span.append(svg);
        
        return span;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the label text element.
     *
     * @return { HTMLSpanElement }
     **/
    _createLabelText()
    {
        return createElement('span', { class: this.settings.labelTextClass }, [ this.settings.text ]);
    }
    
    /**
     * @public
     *
     * @description Added the given class names to the current element.
     *
     * @param { Array<string> } classes
     *
     * @return { void }
     **/
    setClasses(classes)
    {
        setClasses(this.getElement(), classes);
    }
    
    /**
     * @public
     *
     * @description Checks whether the current input state is checked.
     *
     * @return { boolean }
     **/
    isChecked()
    {
        return this.input.checked;
    }
    
    /**
     * @public
     *
     * @description Returns name of the current input.
     *
     * @return { string }
     **/
    getName()
    {
        return this.settings.inputName;
    }
}
