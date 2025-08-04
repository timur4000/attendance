import { Button } from '../../Button/Button.js';
import { TableToggleColumnsSettings } from './TableToggleColumnsSettings.js';
import { Dropdown } from '../../Dropdown/Dropdown.js';
import { createElement } from '../../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createFragment } from '../../../tea-modules/Functions/DOM/Elements/createFragment.js';
import { CustomCheckboxSettings } from '../../Inputs/CustomCheckbox/CustomCheckboxSettings.js';
import { CustomCheckbox } from '../../Inputs/CustomCheckbox/CustomCheckbox.js';
import { InputEventsClassifier } from '../../Inputs/Standards/InputEventsClassifier.js';
import { CustomEvents } from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { TableEventTypesClassifier } from '../Standards/TableEventTypesClassifier.js';
import { Storage } from '../../../tea-modules/Classes/Storage/Storage.js';
import { DropdownEventsClassifier } from '../../Dropdown/DropdownEventsClassifier.js';
import { structureCompare }           from '../../../tea-modules/Functions/Structures/structureCompare.js';
import { isNull } from '../../../tea-modules/Functions/Is/isNull.js';
import { ButtonModifiersClassifier } from '../../Button/ButtonModifiersClassifier.js';


export class TableToggleColumns
{
    /**
     * @private
     *
     * @type { Object<Table> }
     **/
    _tableInstance;
    
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { TableToggleColumnsSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { Button }
     **/
    button;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    content;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    contentInner;
    
    /**
     * @public
     *
     * @type { Dropdown }
     **/
    dropdown;
    
    /**
     * @public
     *
     * @type { Array<CustomCheckbox> }
     **/
    customCheckboxes = [];
    
    /**
     * @public
     *
     * @type { Array<{ isChecked: boolean }> }
     **/
    _checkboxes = [];
    
    /**
     * @constructor
     *
     * @param { TableToggleColumnsSetting } settings
     **/
    constructor(settings)
    {
        this.customEvents = new CustomEvents();
        
        this.settings = new TableToggleColumnsSettings(settings);
        
        this.button = new Button({ elementClass: this.settings.buttonClass, attributes: this.settings.buttonAttributes, iconClass: this.settings.buttonIconClass, iconId: this.settings.buttonIconId, clueSettings: this.settings.buttonClueSettings });
        
        this.contentInner = this._createContentInner();
        
        this.content = this._createContent();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.settings.sessionName = this.settings.sessionName.replace(/%TABLE_ID%/, this._tableInstance.getId());
        
        this.dropdown = new Dropdown(this.button.getElement(), this.content);
        
        this._checkboxes = this.getCheckboxesFromStorage();
        
        const fragment = this._checkboxesProcessing(this._tableInstance.tableElement.getColumnSettings());
        
        this.contentInner.append(fragment);
        
        this.dropdown.customEvents.subscribe(DropdownEventsClassifier.OPEN, this._openHandler.bind(this));
        
        this.dropdown.customEvents.subscribe(DropdownEventsClassifier.CLOSE, this._closeHandler.bind(this));
        
        this.button.setModifier(ButtonModifiersClassifier.PROCESSING, this.isSomeUnchecked());
    }
    
    /**
     * @private
     *
     * @description Creates html node of the content.
     *
     * @return { HTMLDivElement }
     **/
    _createContent()
    {
        return createElement('div', { class: this.settings.contentClass, id: this.settings.contentId, 'data-position': this.settings.contentPosition, 'data-dropdown-ignored': '' }, [ this.contentInner ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the content inner.
     *
     * @return { HTMLDivElement }
     **/
    _createContentInner()
    {
        return createElement('div', { class: this.settings.contentInnerClass });
    }
    
    /**
     * @private
     *
     * @description Implements process of the checkboxes creating.
     *
     * @param { Array<TableElementColumn> } columns
     *
     * @return { DocumentFragment<HTMLInputElement> }
     **/
    _checkboxesProcessing(columns)
    {
        const fragment = createFragment();
        
        for (let i = 0, n = columns.length; i < n; i++)
        {
            const column = columns[i];
            
            const customCheckboxSettings = new CustomCheckboxSettings();
            
            const name = `table-toggle-columns[${ column.name }]`;
            
            customCheckboxSettings.inputName = name;
            
            customCheckboxSettings.inputId = name;
            
            customCheckboxSettings.text = column.label;
            
            customCheckboxSettings.checked = isNull(this._checkboxes)  ? true : this._checkboxes[ name ].isChecked;
            
            const customCheckbox = new CustomCheckbox(customCheckboxSettings);
            
            customCheckbox.customEvents.subscribe(InputEventsClassifier.CHANGE, this._changeHandler.bind(this));
            
            i > 0 && customCheckbox.setClasses([ 'margin-top-10' ]);
            
            customCheckbox.initialization();
            
            this.customCheckboxes.push(customCheckbox);
            
            fragment.append(customCheckbox.getElement());
        }
        
        return fragment;
    }
    
    /**
     * @private
     *
     * @description Implements handler for the change event.
     *
     * @param { HTMLInputElement } input
     *
     * @param { CustomCheckbox } instance
     *
     * @return { void }
     **/
    _changeHandler(input, instance) {}
    
    /**
     * @private
     *
     * @description Implements handler for the open event.
     *
     * @param { Dropdown } instance
     *
     * @return { void }
     **/
    _openHandler(instance)
    {
        this._checkboxes = this.getCheckboxes();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the close event.
     *
     * @param { Dropdown } instance
     *
     * @return { void }
     **/
    _closeHandler(instance)
    {
        if (!this.isChange())
        {
            return ;
        }
        
        this.customEvents.execute(TableEventTypesClassifier.TOGGLE_COLUMNS_CHANGE, instance, this);
        
        this.button.setModifier(ButtonModifiersClassifier.PROCESSING, this.isSomeUnchecked());
        
        this.saveProcessing();
    }
    
    /**
     * @private
     *
     * @description Implements process of the saving checkboxes in storage.
     *
     * @return { void }
     **/
    saveProcessing()
    {
        Storage.set(this.settings.sessionName, JSON.stringify(this.getCheckboxes()));
    }
    
    /**
     * @private
     *
     * @description Returns checkboxes from storage.
     *
     * @return { Array<{ isChecked: boolean }> | null }
     **/
    getCheckboxesFromStorage()
    {
        return JSON.parse(Storage.get(this.settings.sessionName));
    }
    
    /**
     * @private
     *
     * @description Checks whether storage contains checkboxes.
     *
     * @return { boolean }
     **/
    hasCheckboxesFromStorage()
    {
        return Storage.has(this.settings.sessionName);
    }
    
    /**
     * @public
     *
     * @description Sets the given instance to the current object.
     *
     * @param { Object<Table> } instance
     *
     * @return { void }
     **/
    set tableInstance(instance)
    {
        this._tableInstance = instance;
    }
    
    /**
     * @public
     *
     * @description Returns checkboxes.
     *
     * @return { Array<{ isChecked: boolean }> }
     **/
    getCheckboxes()
    {
        const checkboxes = {};
        
        for (let i = 0, n = this.customCheckboxes.length; i < n; i++)
        {
            const customCheckbox = this.customCheckboxes[ i ];
            
            checkboxes[ customCheckbox.getName() ] = { isChecked: customCheckbox.isChecked() };
        }
        
        return checkboxes;
    }
    
    /**
     * @public
     *
     * @description Returns checkboxes.
     *
     * @param { string } name
     *
     * @return { { isChecked: boolean } }
     **/
    getCheckbox(name)
    {
        const customCheckbox = this.customCheckboxes.find(a => a.getName() === `table-toggle-columns[${ name }]`);
        
        return { isChecked: customCheckbox.isChecked() };
    }
    
    /**
     * @public
     *
     * @description Checks whether checkboxes is changed.
     *
     * @return { boolean }
     **/
    isChange()
    {
        return !structureCompare(this.getCheckboxes(), this._checkboxes);
    }
    
    /**
     * @public
     *
     * @description Checks if at least one checkbox is unchecked.
     *
     * @return { boolean }
     **/
    isSomeUnchecked()
    {
        return this.customCheckboxes.some(a => !a.isChecked());
    }
}
