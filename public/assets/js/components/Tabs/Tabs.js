import { TabsSettings } from './TabsSettings.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { TabsButton } from '../Button/TabsButton/TabsButton.js';
import { toggleClass } from '../../tea-modules/Functions/DOM/Elements/toggleClass.js';
import { Storage } from '../../tea-modules/Classes/Storage/Storage.js';
import { TabsStatesClassifier } from './Standards/TabsStatesClassifier.js';
import { TabsViewInsertMethodsClassifier } from './Standards/TabsViewInsertMethodsClassifier.js';
import { getAttribute } from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { isHtmlElement } from '../../tea-modules/Functions/Is/isHtmlElement.js';
import { isString } from '../../tea-modules/Functions/Is/isString.js';
import { Button } from '../Button/Button.js';


/**
 * @class
 *
 * @description Implements logic of Tabs component.
 **/
export class Tabs
{
    /**
     * @public
     *
     * @type { Array<Tabs> }
     **/
    static instances = [];
    
    /**
     * @public
     *
     * @type { TabsSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { string }
     **/
    id;
    
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
    domPanel;
    
    /**
     * @public
     *
     * @type { Array<TabsButton> }
     **/
    tabsButtons = [];
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domContent;
    
    /**
     * @public
     *
     * @type { Array<HTMLDivElement> }
     **/
    domViews = [];
    
    /**
     * @constructor
     *
     * @param { TabsSetting | TabsSettings } settings
     **/
    constructor(settings)
    {
        Tabs.instances.push(this);
        
        this.settings = settings instanceof TabsSettings ? settings : new TabsSettings(settings);
        
        this.domContent = this._createDomContent();
        
        this.domPanel = this._createDomPanel();
        
        this.domElement = this._createDomElement();
        
        this._tabsButtonsProcessing();
        
        this.idProcessing();
    }
    
    /**
     * @public
     *
     * @description Implements initialize base logic of component.
     *
     * @return { void }
     **/
    initialization()
    {
        this._statesProcessing();
        
        this.domPanel.addEventListener('click', this._domPanelClickHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements a click handler for the dom panel event.
     *
     * @param { Element } target
     **/
    _domPanelClickHandler({ target })
    {
        const button = target.closest('button');
        
        if (!button)
        {
            return ;
        }
        
        this.setActive(Button.getInstanceByTheElement(button));
    }
    
    /**
     * @private
     *
     * @description Implements process of the TabsButton components.
     *
     * @return { void }
     **/
    _tabsButtonsProcessing()
    {
        for (let i = 0, n = this.settings.tabsButtonSettings.length; i < n; i++)
        {
            const tabsButtonSetting = this.settings.tabsButtonSettings[ i ];
            
            tabsButtonSetting.elementClass = this.settings.domButtonClassName;
            
            tabsButtonSetting.tabIdentifierName = this.settings.tabIdentifierName;
            
            const instance = new TabsButton(tabsButtonSetting);
            
            instance.tabIdentifierProcessing(this.settings.tabIdentifierName);
            
            tabsButtonSetting.withView && this.addView(tabsButtonSetting.tabIdentifierValue, tabsButtonSetting.viewNode);
            
            this.tabsButtons.push(instance);
            
            this.domPanel.append(instance.getElement());
        }
    }
    
    /**
     * @private
     *
     * @description Implements process of the states.
     *
     * @return { void }
     **/
    _statesProcessing()
    {
        for (let i = 0, n = this.tabsButtons.length; i < n; i++)
        {
            const tabsButton = this.tabsButtons[ i ];
            
            if (!this.getView(tabsButton))
            {
                this.setDisabled(tabsButton, true);
                
                continue ;
            }
            
            if (i === 0 && (!this.settings.withStorage || !this.hasStorage()) || this.hasStorage(tabsButton))
            {
                this.setActive(tabsButton);
            }
        }
    }
    
    /**
     * @public
     *
     * @description Sets the disabled state to the specified TabsButton component by the specified force.
     *
     * @param { TabsButton } tabsButton
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setDisabled(tabsButton, force)
    {
        tabsButton.getElement().tabIndex = -1;
        
        tabsButton.setModifier(TabsStatesClassifier.DISABLED, force);
    }
    
    /**
     * @private
     *
     * @description Sets the active state to the specified TabsButton component by the specified force.
     *
     * @param { TabsButton } tabsButton
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    _activeProcessing(tabsButton, force)
    {
        tabsButton.setModifier(TabsStatesClassifier.ACTIVE, force);
        
        tabsButton.removeAttribute('tabIndex');
        
        this.toStorage(tabsButton);
        
        if (!this.getView(tabsButton))
        {
            return ;
        }
        
        toggleClass(this.getView(tabsButton), TabsStatesClassifier.ACTIVE, force);
    }
    
    /**
     * @public
     *
     * @description Sets the active state to the specified TabsButton component.
     *
     * @param { TabsButton } tabsButton
     *
     * @return { void }
     **/
    setActive(tabsButton)
    {
        const activeTabsButton = this.getActiveTabsButton();
        
        if (activeTabsButton)
        {
            this._activeProcessing(activeTabsButton, false);
        }
        
        this._activeProcessing(tabsButton, true);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomElement()
    {
        const div = createElement('div', { class: this.settings.domElementClassName }, [ this.domPanel, this.domContent ]);
        
        this.settings.modifiers.forEach(modifier => toggleClass(div, this.settings.domElementClassName + '--' + modifier + '-' + this.settings[ modifier ]));
        
        return div;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom panel element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomPanel()
    {
        return createElement('div', { class: this.settings.domPanelClassName });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom content element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomContent()
    {
        return createElement('div', { class: this.settings.domContentClassName });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the dom view element with the specified tab identifier value and appends node if it exists.
     *
     * @param { string } tabIdentifierValue
     *
     * @param { HTMLElement | Text | string ? } node
     *
     * @return { HTMLDivElement }
     **/
    _createDomView(tabIdentifierValue, node)
    {
        return createElement('div', { class: this.settings.domViewClassName, [this.settings.tabIdentifierName]: tabIdentifierValue }, [ node ]);
    }
    
    /**
     * @private
     *
     * @description Implements process of the id.
     *
     * @return { void }
     **/
    idProcessing()
    {
        if (this.settings.id)
        {
            this.id = this.settings.id;
            
            return ;
        }
        
        this.id = 'id_' + Tabs.instances.length;
    }
    
    /**
     * @public
     *
     * @description Adds view with the specified tab identifier value and appends node if it exists.
     *
     * @param { string } tabIdentifierValue
     *
     * @param { HTMLElement | Text | string ? } node
     *
     * @return { HTMLDivElement }
     **/
    addView(tabIdentifierValue, node)
    {
        const div = this._createDomView(tabIdentifierValue, node);
        
        this.domViews.push(div);
        
        this.domContent.append(div);
        
        return div;
    }
    
    /**
     * @public
     *
     * @description Adds view by the specified node.
     *
     * @param { HTMLElement } node
     *
     * @return { void }
     **/
    addViewFromNode(node)
    {
        if (!node)
        {
            return ;
        }
        
        this.domViews.push(node);
        
        this.domContent.append(node);
    }
    
    /**
     * @public
     *
     * @description Returns dom view by the specified tab identifier value or TabsButton component.
     *
     * @param { string | TabsButton } target
     *
     * @return { HTMLDivElement | undefined }
     **/
    getView(target)
    {
        target = isString(target) ? target : this.getTabIdentifierValue(target);
        
        return this.domViews.find(domView => this.getTabIdentifierValue(domView) === target);
    }
    
    /**
     * @public
     *
     * @description Determines whether dom view by the specified tab identifier value or the TabsButton component exists.
     *
     * @param { string | TabsButton } target
     *
     * @return { boolean }
     **/
    hasView(target)
    {
        return !!this.getView(target);
    }
    
    /**
     * @public
     *
     * @description Inserts the specified node into the dom view using the insert method at the specified tab identifier value.
     *
     * @param { string } tabIdentifierValue
     *
     * @param { HTMLElement | Text | string } node
     *
     * @param { TabsViewInsertMethodsClassifier ? } insertMethod
     *
     * @return { boolean }
     **/
    insertToView(tabIdentifierValue, node, insertMethod = TabsViewInsertMethodsClassifier.APPEND)
    {
        const view = this.getView(tabIdentifierValue);
        
        if (!view || !node)
        {
            return false;
        }
        
        view[ insertMethod ](node);
        
        return true;
    }
    
    /**
     * @public
     *
     * @description Returns the TabsButton component by the specified tab identifier value.
     *
     * @param { string } tabIdentifierValue
     *
     * @return { TabsButton | undefined }
     **/
    getTabsButton(tabIdentifierValue)
    {
        return this.tabsButtons.find(tabsButton => this.getTabIdentifierValue(tabsButton) === tabIdentifierValue);
    }
    
    /**
     * @public
     *
     * @description Returns the active TabsButton component.
     *
     * @return { TabsButton | undefined }
     **/
    getActiveTabsButton()
    {
        return this.tabsButtons.find(tabsButton => tabsButton.hasModifier(TabsStatesClassifier.ACTIVE));
    }
    
    /**
     * @public
     *
     * @description Returns the tab identifier value of the specified element.
     *
     * @param { HTMLElement | TabsButton } target
     *
     * @return { string }
     **/
    getTabIdentifierValue(target)
    {
        const element = isHtmlElement(target) ? target : target.getElement();
        
        return getAttribute(element, this.settings.tabIdentifierName);
    }
    
    /**
     * @public
     *
     * @description Saves the name of the specified TabsButton component in the storage.
     *
     * @param { TabsButton } tabsButton
     *
     * @return { void }
     **/
    toStorage(tabsButton)
    {
        Storage.set(this.getId(), this.getTabIdentifierValue(tabsButton));
    }
    
    /**
     * @public
     *
     * @description Returns the name of the TabsButton component from the storage, if it exists.
     *
     * @return { string | null }
     **/
    fromStorage()
    {
        return Storage.get(this.getId());
    }
    
    /**
     * @public
     *
     * @description Determines whether the storage contains name of some TabsButton component. If argument tabsButton exists, checks it.
     *
     * @param { TabsButton ? } tabsButton
     *
     * @return { boolean }
     **/
    hasStorage(tabsButton)
    {
        return !tabsButton ? !!this.fromStorage() : this.getTabsButton(this.fromStorage()) === tabsButton;
    }
    
    /**
     * @public
     *
     * @description Returns the dom content element.
     *
     * @return { HTMLDivElement }
     **/
    getDomContent()
    {
        return this.domContent;
    }
    
    /**
     * @public
     *
     * @description Returns the dom element.
     *
     * @return { HTMLDivElement }
     **/
    getDomElement()
    {
        return this.domElement;
    }
    
    /**
     * @public
     *
     * @description Returns the id of the component.
     *
     * @return { string }
     **/
    getId()
    {
        return this.id;
    }
}