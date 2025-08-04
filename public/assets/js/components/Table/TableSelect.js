import { TableSelectSettings } from './Settings/TableSelectSettings.js';
import { createElement }       from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { CustomSelect }        from '../CustomSelect/CustomSelect.js';


/**
 * @class
 *
 * @description Implements work with table select.
 **/
export class TableSelect
{
    /**
     * @public
     *
     * @type { TableSelectSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLSelectElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { CustomSelect }
     **/
    customSelect;
    
    /**
     * @constructor
     *
     * @param { TableSelectSettingProperties } settings
     *
     * @return { TableSelect }
     **/
    constructor(settings)
    {
        this.settings = new TableSelectSettings(settings);
        
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
        this._createOptions();
        
        this.customSelect = new CustomSelect(this.element, this.settings.customSelectSettings);
        
        this.customSelect.initialization();
    }
    
    /**
     * @private
     *
     * @description Creates html node of the element.
     *
     * @return { HTMLSelectElement }
     **/
    _createElement()
    {
        const attributes =
                  {
                      name: this.settings.elementName,
                      [this.settings.elementAttribute]: '',
                      'data-placeholder': this.settings.placeholder,
                      'data-search-placeholder': this.settings.searchPlaceholder,
                      'data-with-label': this.settings.withLabel,
                      'data-with-search': this.settings.withSearch,
                  };
        
        return createElement('select', attributes);
    }
    
    /**
     * @private
     *
     * @description Creates options of the element.
     *
     * @return { void }
     **/
    _createOptions()
    {
        for (let i = 0, n = this.settings.options.length; i < n; i++)
        {
            const option = this.settings.options[i];
            
            this.element.add(new Option(option.text, option.value, option.isSelected, option.isSelected));
        }
    }
}
