import { BaseDashboardSettings } from './BaseDashboardSettings.js';
import { createElement }         from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { DashboardTypesClassifier } from './Standards/DashboardTypesClassifier.js';
import { LibraryChars } from '../../tea-modules/Classes/Standards/Chars/LibraryChars.js';
import { isStructureEmpty } from '../../tea-modules/Functions/Is/isStructureEmpty.js';
import { Configurations } from '../../standards/Configurations/Configurations.js';


/**
 * @abstract
 *
 * @description Implements abstract logic of all possible Dashboard components.
 **/
export class BaseDashboard
{
    /**
     * @public
     *
     * @type { BaseDashboardSettings }
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
     * @type { Array<HTMLDivElement> }
     **/
    domLines = [];
    
    
    /**
     * @public
     *
     * @type { ConfigurationCodesClassifier }
     **/
    autoUpdateDelayConfigurationCode;
    
    /**
     * @public
     *
     * @type { Object }
     **/
    autoUpdateDelayConfiguration;
    
    /**
     * @constructor
     *
     * @param { BaseDashboardSetting | BaseDashboardSettings } settings
     **/
    constructor(settings)
    {
        this.settings = settings instanceof BaseDashboard ? settings : new BaseDashboardSettings(settings);
        
        this.domElement = this._createDomElement();
        
        this.setModifier(this.settings.type, true);
    }
    
    /**
     * @abstract
     *
     * @description Implements initialize base logic of component.
     *
     * @return { void }
     **/
    async initialization()
    {
        await this._autoUpdateDelayConfigurationProcessing();
    }
    
    /**
     * @protected
     *
     * @description Implements process of the auto-update configuration.
     *
     * @return { void }
     **/
    async _autoUpdateDelayConfigurationProcessing()
    {
        this.autoUpdateDelayConfiguration = (await Configurations.get(this.autoUpdateDelayConfigurationCode)).record;
    }
    
    /**
     * @public
     *
     * @description Launches auto-update.
     *
     * @return { void }
     **/
    autoUpdateLauncher()
    {
        this.autoUpdateCancel();
        
        this.autoUpdateIntervalId = setInterval(this._autoUpdateIntervalHandler.bind(this), this.getAutoUpdateDelay());
    }
    
    /**
     * @private
     *
     * @description Implements handler for the auto-update interval.
     *
     * @return { void }
     **/
    async _autoUpdateIntervalHandler()
    {
        await this.update();
    }
    
    /**
     * @public
     *
     * @description Cancels auto-update.
     *
     * @return { void }
     **/
    autoUpdateCancel()
    {
        clearInterval(this.autoUpdateIntervalId);
    }
    
    /**
     * @public
     *
     * @description Updates component.
     *
     * @return { void }
     **/
    async update()
    {
        this.autoUpdateCancel();
        
        await this._updateProcessing();
        
        this.autoUpdateLauncher();
    }
    
    /**
     * @abstract
     *
     * @protected
     *
     * @description Implements process of the updating component.
     *
     * @return { Promise<void> }
     **/
    async _updateProcessing() {}
    
    /**
     * @public
     *
     * @description Returns delay of the auto-update process.
     *
     * @return { number }
     **/
    getAutoUpdateDelay()
    {
        return this.autoUpdateDelayConfiguration.value_integer;
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
        return createElement('div', { class: this.settings.domElementClassName });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom line element.
     *
     * @param { HTMLElement } element
     *
     * @param { ...string } modifiers
     *
     * @return { HTMLDivElement }
     **/
    _createDomLine(element, ...modifiers)
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.domLineClassName, modifiers) }, [ element ]);
    }
    
    /**
     * @private
     *
     * @description Implements adding the specified modifiers to the specified string.
     *
     * @param { string } string
     *
     * @param { Array<string> } modifiers
     *
     * @return { string }
     **/
    _modifiersProcessing(string, modifiers)
    {
        if (isStructureEmpty(modifiers))
        {
            return string;
        }
        
        return string + LibraryChars.space + modifiers.join(LibraryChars.space);
    }
    
    /**
     * @public
     *
     * @description Sets the specified modifier to the element by the specified force.
     *
     * @param { DashboardTypesClassifier } modifier
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
     * @description Check if the element contains the specified modifier.
     *
     * @param { DashboardTypesClassifier } modifier
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
     * @description Creates a line and append the specified element to it.
     *
     * @param { HTMLElement } element
     *
     * @param { ...string } modifiers
     *
     * @return { void }
     **/
    addLine(element, ...modifiers)
    {
        const line = this._createDomLine(element, ...modifiers);
        
        this.domLines.push(line);
        
        this.domElement.append(line);
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
}
