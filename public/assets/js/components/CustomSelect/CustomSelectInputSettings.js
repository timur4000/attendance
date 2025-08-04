/**
 * @class
 *
 * @description Contains all settings of the input of custom select.
 **/
export class CustomSelectInputSettings
{
    /**
     * @typedef { Object } CustomSelectInputSettingsItems
     *
     * @property { string[] ? } elementClass - The css class of the element.
     *
     * @property { string[] ? } textClass - The css class of the text tag.
     *
     * @property { string[] ? } labelClass - The css class of the label tag
     * .
     * @property { boolean ? } withLabel - Determines whether a label is needed.
     *
     * @property { string[] ? } valueClass - The css class of the value tag
     * .
     * @property { string[] ? } iconClass - The css class of the icon tag.
     *
     * @property { string[] ? } svgClass - The css class of the svg tag.
     *
     * @property { string ? } svgId - The id of the svg tag.
     *
     * @property { string ? } placeholder - The placeholder for the label.
     **/
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    elementClass = [ 'custom-select-input' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    textClass = [ 'custom-select-input__text' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    labelClass = [ 'custom-select-input__label' ];
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withLabel = true;
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    valueClass = [ 'custom-select-input__value' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    iconClass = [ 'custom-select-input__icon' ];
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    svgClass = [ 'icon', 'icon-size-10' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    svgID = 'arrows-down';
    
    /**
     * @public
     *
     * @type { string[] }
     **/
    loaderSvgClass = [ 'icon', 'icon-size-10' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    loaderSvgID = 'settings-long-loader';
    
    /**
     * @public
     *
     * @type { string }
     **/
    placeholder = 'Select items';
}