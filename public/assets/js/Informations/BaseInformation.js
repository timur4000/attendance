import { Information } from '../components/Information/Information.js';
import { InformationSettings } from '../components/Information/InformationSettings.js';
import { InformationTypesClassifier } from '../components/Information/Standards/InformationTypesClassifier.js';
import { InformationThemesClassifier } from '../components/Information/Standards/InformationThemesClassifier.js';
import { InformationSizesClassifier } from '../components/Information/Standards/InformationSizesClassifier.js';
import { InformationEventsClassifier } from '../components/Information/Standards/InformationEventsClassifier.js';


/**
 * @abstract
 *
 * @description Implements abstract logic of all possible information components.
 **/
export class BaseInformation
{
    /**
     * @public
     *
     * @type { Information }
     **/
    information;
    
    /**
     * @public
     *
     * @type { InformationSizesClassifier }
     **/
    size = InformationSizesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { InformationThemesClassifier }
     **/
    theme = InformationThemesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { InformationTypesClassifier }
     **/
    type = InformationTypesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withHeading = true;
    
    /**
     * @public
     *
     * @type { Object<InformationNestedTypesClassifier, InformationPositionsClassifier> }
     **/
    positions;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withTabs = false;
    
    /**
     * @constructor
     **/
    constructor() {}
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async baseInitialization()
    {
        this.information = this._createInformation();
        
        this.information.customEvents.subscribe(InformationEventsClassifier.INITIAL, this._keyUpHandler.bind(this));
        
        this.information.customEvents.subscribe(InformationEventsClassifier.KEY_UP, this._keyUpHandler.bind(this));
        
        this.information.customEvents.subscribe(InformationEventsClassifier.TOGGLE_BUTTONS_TOGGLE, this._toggleButtonToggleHandler.bind(this));
    }
    
    /**
     * @public
     *
     * @description Implements initialize main logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        await this.information.initialization();
    }
    
    /**
     * @protected
     *
     * @description Updates component.
     *
     * @param { ...any } variables
     *
     * @return { void }
     **/
    async update(...variables) {}
    
    /**
     * @protected
     *
     * @description Sets the loading state for the components.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    async loading(force) {}
    
    /**
     * @protected
     *
     * @description Renders the components.
     *
     * @return { void }
     **/
    async render() {}
    
    /**
     * @private
     *
     * @description Creates instance of the Information component.
     *
     * @return { Information }
     **/
    _createInformation()
    {
        const settings = new InformationSettings(this._getSettings());
        
        return new Information(settings);
    }
    
    /**
     * @protected
     *
     * @description Returns settings of the Information component.
     *
     * @return { InformationSetting }
     **/
    _getSettings()
    {
        const settings =
                  {
                      size: this.size,
                      theme: this.theme,
                      type: this.type,
                      heading: this._getHeading(),
                      withHeading: this.withHeading,
                      margins: this._getMargins(),
                      customInputOptions: this._getCustomInputOptions(),
                      toggleButtonSettings: this._getToggleButtonsSettings(),
                      withTabs: this.withTabs,
                      tabsSettings: this._getTabsSettings(),
                  };
        
        if (this.positions)
        {
            settings.positions = this.positions;
        }
        
        return settings;
    }
    
    /**
     * @protected
     *
     * @description Returns heading of the Information component.
     *
     * @return { string }
     **/
    _getHeading()
    {
        return '';
    }
    
    /**
     * @protected
     *
     * @description Returns margins of the Information component.
     *
     * @return { string }
     **/
    _getMargins()
    {
        return '0 0 0 0';
    }
    
    /**
     * @protected
     *
     * @description Returns custom input options of the Information component.
     *
     * @return { Array<CustomInputSetting> }
     **/
    _getCustomInputOptions()
    {
        return [];
    }
    
    /**
     * @protected
     *
     * @description Returns ToggleButtons settings of the Information component.
     *
     * @return { ToggleButtonsSetting }
     **/
    _getToggleButtonsSettings()
    {
        return {};
    }
    
    /**
     * @protected
     *
     * @description Returns Tabs settings of the Information component.
     *
     * @return { TabsSetting }
     **/
    _getTabsSettings()
    {
        return {};
    }
    
    /**
     * @protected
     *
     * @description Implements a keyup handler of the Information.
     *
     * @param { HTMLInputElement } input
     *
     * @param { CustomInput } customInput
     *
     * @param { Information } instance
     *
     * @return { Promise<void> }
     **/
    async _keyUpHandler(input, customInput, instance) {}
    
    /**
     * @protected
     *
     * @description Implements a toggle-buttons toggle handler of the Information.
     *
     * @param { boolean } state
     *
     * @param { Button } button
     *
     * @param { ToggleButtons } toggleButtons
     *
     * @param { Information } instance
     *
     * @return { Promise<void> }
     **/
    async _toggleButtonToggleHandler(state, button, toggleButtons, instance) {}
    
    /**
     * @public
     *
     * @description Returns element of the Information component.
     *
     * @return { HTMLDivElement }
     **/
    getElement()
    {
        return this.information.getElement();
    }
}
