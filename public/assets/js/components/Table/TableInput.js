import { TableInputSettings } from './Settings/TableInputSettings.js';
import { createElement }      from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createSvgElement }   from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { CustomEvents }       from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { TableEventTypesClassifier } from './Standards/TableEventTypesClassifier.js';
import { AirDatepickerOuter } from '../AirDatepickerOuter/AirDatepickerOuter.js';
import { structureValue } from '../../tea-modules/Functions/Structures/structureValue.js';


/**
 * @class
 *
 * @description Implements creating the input element of the table component.
 **/
export class TableInput
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
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { TableInputSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLLabelElement }
     **/
    label;
    
    /**
     * @public
     *
     * @type { SVGElement }
     **/
    icon;
    
    /**
     * @public
     *
     * @type { HTMLInputElement }
     **/
    input;
    
    /**
     * @private
     *
     * @type { AirDatepickerOuter }
     **/
    datepicker;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    hasEditing = false;
    
    /**
     * @private
     *
     * @type { number }
     **/
    _timeout;
    
    /**
     * @public
     *
     * @type { number }
     **/
    static id = 0;
    
    /**
     * @constructor
     *
     * @param { TableInputSettingProperties } settings
     *
     * @return { TableInput }
     **/
    constructor(settings = {})
    {
        this.customEvents = new CustomEvents();
        
        this.settings = new TableInputSettings(settings);
        
        if (this.settings.iconId)
        {
            this.icon = this._createIcon();
            
            this.label = this._createLabel();
        }
        
        this.input = this._createInput();
        
        this.element = this._createElement();
        
        if (this.settings.value)
        {
            this.hasEditing = true;
        }
    }
    
    /**
     * @public
     *
     * @description Implements initialize of the element.
     *
     * @return { void }
     **/
    async initialization()
    {
        this.input.addEventListener('keyup', this._keyupHandler.bind(this));
        
        if (this.isDatepicker())
        {
            if (structureValue(this.settings.datepickerSettings, 'selectedDates.0'))
            {
                this.hasEditing = true;
            }
            
            this.datepicker = new AirDatepickerOuter(this.input, this.settings.datepickerSettings);
            
            await this.datepicker.initialization();
        }
    }
    
    /**
     * @public
     *
     * @description Implements handler for the input keyup event.
     *
     * @param { KeyboardEvent } event
     *
     * @return { void }
     **/
    _keyupHandler(event)
    {
        clearTimeout(this._timeout);
        
        this._timeout = setTimeout(this._keyupTimeoutHandler.bind(this, event), this.settings.timeout);
    }
    
    /**
     * @public
     *
     * @description Implements handler for the input keyup timeout.
     *
     * @param { KeyboardEvent } event
     *
     * @return { void }
     **/
    _keyupTimeoutHandler(event)
    {
        this.hasEditing = Boolean(this.input.value);
        
        this.customEvents.execute(TableEventTypesClassifier.INPUT_KEYUP, this.input, this);
    }
    
    /**
     * @private
     *
     * @description Creates the html node of base element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClassName, [this.settings.elementAttribute]: '' }, [ this.input, this.label ]);
    }
    
    /**
     * @private
     *
     * @description Creates the html node of the label element.
     *
     * @return { HTMLLabelElement }
     **/
    _createLabel()
    {
        return createElement('label', { class: this.settings.labelClassName, for: this._getId() }, [ this.icon ]);
    }
    
    /**
     * @private
     *
     * @description Creates the html node of the icon element.
     *
     * @return { SVGElement }
     **/
    _createIcon()
    {
        return createSvgElement(this.settings.iconId, { class: this.settings.iconClassName });
    }
    
    /**
     * @private
     *
     * @description Creates the html node of the input element.
     *
     * @return { HTMLInputElement }
     **/
    _createInput()
    {
        return createElement('input', { type: this.settings.elementType, class: this.settings.inputClassName, placeholder: this.settings.inputPlaceholder, name: this.settings.inputName, id: this._getId(), value: this.settings.value ?? '' });
    }
    
    /**
     * @private
     *
     * @description Returns id from settings otherwise if id is empty generated new and returns then.
     *
     * @return { string }
     **/
    _getId()
    {
        return `table-input-${ (this.settings.inputId || ++TableInput.id) }`;
    }
    
    /**
     * @public
     *
     * @description Returns value of the input element.
     *
     * @return { string }
     **/
    getValue()
    {
        return this.input.value;
    }
    
    /**
     * @public
     *
     * @description Returns name of the input element.
     *
     * @return { string }
     **/
    getName()
    {
        return this.input.name;
    }
    
    /**
     * @public
     *
     * @description Checks whether the input should be a datepicker.
     *
     * @return { boolean }
     **/
    isDatepicker()
    {
        return this.settings.isDatepicker;
    }
    
    /**
     * @public
     *
     * @description Checks whether data should be loaded after input.
     *
     * @return { boolean }
     **/
    isToLoad()
    {
        return this.settings.isToLoad;
    }
}
