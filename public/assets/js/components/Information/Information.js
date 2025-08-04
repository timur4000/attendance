import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { LibraryChars }  from '../../tea-modules/Classes/Standards/Chars/LibraryChars.js';
import { CustomInputSettings } from '../Inputs/CustomInputSettings.js';
import { CustomInput } from '../Inputs/CustomInput.js';
import { isStructureEmpty } from '../../tea-modules/Functions/Is/isStructureEmpty.js';
import { CustomEvents } from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { InformationEventsClassifier } from './Standards/InformationEventsClassifier.js';
import { InputEventsClassifier } from '../Inputs/Standards/InputEventsClassifier.js';
import { ToggleButtons } from '../ToggleButtons/ToggleButtons.js';
import { ToggleButtonsEventsClassifier } from '../ToggleButtons/ToggleButtonsEventsClassifier.js';
import { InformationPositionsClassifier } from './Standards/InformationPositionsClassifier.js';
import { InformationNestedTypesClassifier } from './Standards/InformationNestedTypesClassifier.js';
import { InformationSettings } from './InformationSettings.js';
import { Tabs } from '../Tabs/Tabs.js';


/**
 * @description Implements logic of the Information component.
 **/
export class Information
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
     * @type { InformationSettings }
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
     * @type { HTMLDivElement }
     **/
    domUpper;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domUpperLeftColumn;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domUpperRightColumn;
    
    /**
     * @public
     *
     * @type { HTMLHeadingElement }
     **/
    domHeading;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domInputs;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domLower;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domLowerHeader;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domLowerBody;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domLowerFooter;
    
    /**
     * @public
     *
     * @type { Array<CustomInput> }
     **/
    customInputs = [];
    
    /**
     * @public
     *
     * @type { ToggleButtons }
     **/
    toggleButtons ;
    
    /**
     * @public
     *
     * @type { Tabs }
     **/
    tabs ;
    
    /**
     * @constructor
     *
     * @param { InformationSetting | InformationSettings } settings
     **/
    constructor(settings)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = settings instanceof InformationSettings ? settings : new InformationSettings(settings);
        
        this.domLowerBody = this._createLowerBody();
        
        this.domLower = this._createLower();
        
        this.domHeading = this._createHeading();
        
        this.domUpperLeftColumn = this._createUpperLeftColumn();
        
        this.domUpperRightColumn = this._createUpperRightColumn();
        
        this.domUpper = this._createUpper();
        
        this.domElement = this._createElement();
        
        if (this.settings.withHeading)
        {
            this.insert(this.domHeading, InformationNestedTypesClassifier.HEADING);
        }
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    async initialization()
    {
        this._marginsProcessing();
        
        await this._customInputsProcessing();
        
        this._toggleButtonsProcessing();
        
        this._tabsProcessing();
        
        this.customEvents.execute(InformationEventsClassifier.INITIAL);
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
        return createElement('div', { class: this._modifiersProcessing(this.settings.elementClassName) }, [ this.domUpper, this.domLower ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the upper.
     *
     * @return { HTMLDivElement }
     **/
    _createUpper()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.upperClassName) }, [ this.domUpperLeftColumn, this.domUpperRightColumn ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the upper left column.
     *
     * @return { HTMLDivElement }
     **/
    _createUpperLeftColumn()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.upperLeftColumnClassName) }, []);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the upper right column.
     *
     * @return { HTMLDivElement }
     **/
    _createUpperRightColumn()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.upperRightColumnClassName) });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the heading.
     *
     * @return { HTMLHeadingElement }
     **/
    _createHeading()
    {
        return createElement('h' + this.settings.headingLevel, { class: this._modifiersProcessing(this.settings.headingClassName) }, [ this.settings.heading ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the inputs.
     *
     * @return { HTMLDivElement }
     **/
    _createInputs()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.inputsClassName) });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the lower.
     *
     * @return { HTMLDivElement }
     **/
    _createLower()
    {
        const nodes = [];
        
        nodes.push(this.domLowerBody);
        
        this.settings.withHeader && (this.domLowerHeader = this._createLowerHeader());
        
        this.settings.withFooter && (this.domLowerFooter = this._createLowerFooter());
        
        return createElement('div', { class: this._modifiersProcessing(this.settings.lowerClassName) }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the lower header.
     *
     * @return { HTMLDivElement }
     **/
    _createLowerHeader()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.lowerHeaderClassName) });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the lower body.
     *
     * @return { HTMLDivElement }
     **/
    _createLowerBody()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.lowerBodyClassName) });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the lower footer.
     *
     * @return { HTMLDivElement }
     **/
    _createLowerFooter()
    {
        return createElement('div', { class: this._modifiersProcessing(this.settings.lowerFooterClassName) });
    }
    
    /**
     * @private
     *
     * @description Implements process of the margins.
     *
     * @return { HTMLDivElement }
     **/
    _marginsProcessing()
    {
        this.domElement.style.margin = this.settings.margins;
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
     * @private
     *
     * @description Implements process of the CustomInput components.
     *
     * @return { void }
     **/
    async _customInputsProcessing()
    {
        if (isStructureEmpty(this.settings.customInputOptions))
        {
            return ;
        }
        
        this.domInputs = this._createInputs();
        
        for (let i = 0, n = this.settings.customInputOptions.length; i < n; i++)
        {
            const customInputOption = this.settings.customInputOptions[ i ];
            
            const customInputSettings = new CustomInputSettings(customInputOption);
            
            const customInput = new CustomInput(customInputSettings);
            
            this.customInputs.push(customInput);
            
            await customInput.initialization();
            
            if (this.domInputs.contains(customInput.getInputOuter()))
            {
                continue ;
            }
            
            customInput.customEvents.subscribe(InputEventsClassifier.KEY_UP, this._customInputKeyUpHandler.bind(this));
            
            this.domInputs.append(customInput.getInputOuter());
        }
        
        this.insert(this.domInputs, InformationNestedTypesClassifier.INPUTS);
    }
    
    /**
     * @private
     *
     * @description Implements a keyup handler for the CustomInputs.
     *
     * @param { HTMLInputElement } input
     *
     * @param { CustomInput } instance
     *
     * @return { void }
     **/
    _customInputKeyUpHandler(input, instance)
    {
        this.customEvents.execute(InformationEventsClassifier.KEY_UP, input, instance, this);
    }
    
    /**
     * @private
     *
     * @description Implements process of the ToggleButtons component.
     *
     * @return { void }
     **/
    _toggleButtonsProcessing()
    {
        if (!this.withToggleButtons())
        {
            return ;
        }
        
        const toggleButtons = new ToggleButtons(this.settings.toggleButtonSettings);
        
        toggleButtons.customEvents.subscribe(ToggleButtonsEventsClassifier.TOGGLE, this._toggleButtonsToggleHandler.bind(this));
        
        this.toggleButtons = toggleButtons;
        
        this.insert(toggleButtons.getWrapper(), InformationNestedTypesClassifier.TOGGLE_BUTTONS);
        
        toggleButtons.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements a toggle handler for the ToggleButtons component.
     *
     * @param { boolean } state
     *
     * @param { Button } button
     *
     * @param { ToggleButtons } instance
     *
     * @return { void }
     **/
    _toggleButtonsToggleHandler(state, button, instance)
    {
        this.customEvents.execute(InformationEventsClassifier.TOGGLE_BUTTONS_TOGGLE, state, button, instance, this);
    }
    
    /**
     * @private
     *
     * @description Implements process of the Tabs component.
     *
     * @return { void }
     **/
    _tabsProcessing()
    {
        if (!this.settings.withTabs)
        {
            return ;
        }
        
        const tabs = new Tabs(this.settings.tabsSettings);
        
        this.tabs = tabs;
        
        tabs.initialization();
        
        this.insert(tabs.getDomContent(), InformationNestedTypesClassifier.TABS_CONTENT);
        
        this.insert(tabs.getDomElement(), InformationNestedTypesClassifier.TABS);
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
     * @description Returns element.
     *
     * @return { HTMLDivElement }
     **/
    getElement()
    {
        return this.domElement;
    }
    
    /**
     * @public
     *
     * @description Returns CustomInput component by the specified id.
     *
     * @param { string } id
     *
     * @return { CustomInput }
     **/
    getCustomInputById(id)
    {
        return this.customInputs.find(value => value.settings.inputId === id);
    }
    
    /**
     * @public
     *
     * @description Inserts the specified element into the element by the specified nested type.
     *
     * @param { Element | DocumentFragment } element
     *
     * @param { ? InformationNestedTypesClassifier } nestedType
     *
     * @return { void }
     **/
    insert(element, nestedType = null)
    {
        const position = this.settings.positions[ nestedType ];
        
        switch (position)
        {
            case InformationPositionsClassifier.UPPER_LEFT:
            {
                this.domUpperLeftColumn.append(element);
                
                break ;
            }
            case InformationPositionsClassifier.UPPER_RIGHT:
            {
                this.domUpperRightColumn.append(element);
                
                break ;
            }
            default:
            {
                this.domLowerBody.append(element);
            }
        }
    }
    
    /**
     * @public
     *
     * @description Determines whether ToggleButtons component is needed.
     *
     * @return { boolean }
     **/
    withToggleButtons()
    {
        return !isStructureEmpty(this.settings.toggleButtonSettings);
    }
}
