import { CustomSelectInputSettings } from './CustomSelectInputSettings.js';
import { structureMerge }            from '../../tea-modules/Functions/Structures/structureMerge.js';
import { CustomSelectContentSettings } from './CustomSelectContentSettings.js';
import { getAttribute } from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';

/**
 * @class
 *
 * @description Contains all settings of the custom select.
 **/
export class CustomSelectSettings
{
    /**
     * @typedef { Object } CustomSelectSettingsItems
     *
     * @property { string ? } elementAttribute - The data attribute of the element.
     *
     * @property { string[] ? } elementClass - The css class of the element.
     *
     * @property { CustomSelectInputSettingsItems ? } inputSettings - The settings of input.
     *
     * @property { CustomSelectMultipleInputSettingProperties ? } multipleInputSettings - The settings of multiple input.
     *
     * @property { CustomSelectContentSettingsItems ? } contentSettings - The settings of content.
     *
     * @property { HttpRequestSettingProperties ? } httpRequestSettings - The settings of the http request.
     *
     * @property { boolean ? } isSaveCache - Determines whether data should be stored in cache.
     *
     * @property { string ? } id - Unique identifier.
     *
     * @property { boolean ? } isStorage - Checks whether the options should be saved to storage.
     **/
    
    /**
     * @private
     *
     * @type { HTMLSelectElement }
     **/
    select;
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementAttribute = 'data-custom-select-element';
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'custom-select', 'custom-select--size-default', 'custom-select--theme-mercury' ];
    
    /**
     * @public
     *
     * @type { CustomSelectInputSettings }
     **/
    inputSettings = new CustomSelectInputSettings();
    
    /**
     * @public
     *
     * @type { CustomSelectMultipleInputSettingProperties }
     **/
    multipleInputSettings = {};
    
    /**
     * @public
     *
     * @type { CustomSelectContentSettings }
     **/
    contentSettings = new CustomSelectContentSettings();
    
    /**
     * @public
     *
     * @type { HttpRequestSettingProperties }
     **/
    httpRequestSettings = {};
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isSaveCache = true;
    
    /**
     * @public
     *
     * @type { string }
     **/
    id = '';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isStorage = false;
    
    /**
     * @constructor
     *
     * @param { CustomSelectSettingsItems } settings
     *
     * @param { HTMLSelectElement } select
     *
     * @return { CustomSelectSettings }
     **/
    constructor(settings = {}, select)
    {
        this.select = select;
        
        structureMerge(this, settings);
        
        const withSearch = this.attribute('with-search');
        
        if (withSearch)
        {
            this.contentSettings.withSearch = Boolean(parseInt(withSearch));
        }
        
        const placeholder = this.attribute('placeholder');
        
        if (placeholder)
        {
            this.inputSettings.placeholder = placeholder;
        }
        
        const SearchInputPlaceholder = this.attribute('search-input-placeholder');
        
        if (SearchInputPlaceholder)
        {
            this.contentSettings.searchInputPlaceholder = SearchInputPlaceholder;
        }
        
        const withLabel = this.attribute('with-label');
        
        if (withLabel)
        {
            this.inputSettings.withLabel = Boolean(parseInt(withLabel));
        }
    }
    
    /**
     * @private
     *
     * @description Returns attribute by the given qualified name.
     *
     * @param { string } qualifiedName
     *
     * @return { string }
     **/
    attribute(qualifiedName)
    {
        return getAttribute(this.select, qualifiedName, { isDataAttribute: true, isAfterRemove: true });
    }
}
