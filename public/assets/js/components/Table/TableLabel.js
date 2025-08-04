import { TableLabelSettings } from './Settings/TableLabelSettings.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';


/**
 * @class
 *
 * @description Implement work with table label element.
 **/
export class TableLabel
{
    /**
     * @public
     *
     * @type { TableLabelSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLSpanElement }
     **/
    element;
    
    /**
     * @constructor
     *
     * @param { TableLabelSettingProperties ? } settings
     *
     * @return { TableLabel }
     **/
    constructor(settings = {})
    {
        this.settings = new TableLabelSettings(settings);
        
        this.element = this._createElement();
        
        this.element.classList.add(this.settings.type, this.settings.statusType);
        
        this.setValue(this.settings.value);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLSpanElement }
     **/
    _createElement()
    {
        return createElement('span', { class: this.settings.elementClass });
    }
    
    /**
     * @public
     *
     * @description Sets the given value in to element.
     *
     * @param { Element | string } value
     *
     * @return { void }
     **/
    setValue(value)
    {
        this.clear();
        
        this.element.append(value);
    }
    
    /**
     * @public
     *
     * @description Clears inner content of the element.
     *
     * @return { void }
     **/
    clear()
    {
        this.element.innerHTML = '';
    }
}
