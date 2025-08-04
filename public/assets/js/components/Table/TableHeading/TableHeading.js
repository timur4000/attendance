import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { TableHeadingSettings } from './TableHeadingSettings.js';


/**
 * @class
 *
 * @description Implements logic for the table heading component.
 **/
export class TableHeading
{
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { TableHeadingSettings }
     **/
    settings;
    
    /**
     * @constructor
     *
     * @param { TableHeadingSettingProperties } settings
     *
     * @return { TableHeading }
     **/
    constructor(settings)
    {
        this.settings = new TableHeadingSettings(settings);
        
        this.domElement = this._createDomElement();
    }
    
    /**
     * @public
     *
     * @description Implements base logic of the component.
     *
     * @return { void }
     **/
    initialization()
    {
        this.domElement.classList.add(`level-${ this.settings.level }`);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the base element.
     *
     * @return { HTMLHeadingElement }
     **/
    _createDomElement()
    {
        return createElement(`h${ this.settings.level }`, { class: this.settings.domElementClass }, [ this.settings.text ]);
    }
    
    /**
     * @public
     *
     * @description Returns element.
     *
     * @return { HTMLHeadingElement }
     **/
    getDomElement()
    {
        return this.domElement;
    }
}
