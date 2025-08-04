import { ButtonSettings } from './ButtonSettings.js';
import { createElement }  from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createSvgElement } from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { createText } from '../../tea-modules/Functions/DOM/Elements/createText.js';
import { isEmpty } from '../../tea-modules/Functions/Is/isEmpty.js';
import { Clue } from '../Clue/Clue.js';
import { setAttribute } from '../../tea-modules/Functions/DOM/Attributes/setAttribute.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { CustomEvents } from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { convertToFullUrl } from '../../tea-modules/Functions/Convertations/convertToFullUrl.js';
import { ButtonEventsClassifier } from './ButtonEventsClassifier.js';
import { ButtonModifiersClassifier } from './ButtonModifiersClassifier.js';
import { getAttribute } from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { isHtmlElement } from '../../tea-modules/Functions/Is/isHtmlElement.js';
import { setClasses } from '../../tea-modules/Functions/DOM/Elements/setClasses.js';
import { isUndefined } from '../../tea-modules/Functions/Is/isUndefined.js';
import { removeAttribute } from '../../tea-modules/Functions/DOM/Attributes/removeAttribute.js';


/**
 * @class
 *
 * @description Implements extending for the button component.
 **/
export class Button
{
    /**
     * @static
     *
     * @public
     *
     * @type { Button[] }
     **/
    static instances = [];
    
    /**
     * @public
     *
     * @type { CustomEvents }
     **/
    customEvents;
    
    /**
     * @public
     *
     * @type { ButtonSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLButtonElement | HTMLAnchorElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { SVGElement }
     **/
    icon;
    
    /**
     * @public
     *
     * @type { SVGElement }
     **/
    loadingIcon;
    
    /**
     * @public
     *
     * @type { Text | HTMLElement }
     **/
    text;
    
    /**
     * @public
     *
     * @type { Clue }
     **/
    clue;
    
    /**
     * @constructor
     *
     * @param { HTMLElement | string ? } element
     *
     * @param { ButtonSettingProperties } settings
     *
     * @return { Button }
     **/
    constructor(settings = {}, element)
    {
        Button.instances.push(this);
        
        this.customEvents = new CustomEvents();
        
        this.settings = settings instanceof ButtonSettings ? settings : new ButtonSettings(settings);
        
        this.element = querySelector(element) || this._createElement();
        
        if (isHtmlElement(element))
        {
            this.settings.fromNode(this.element);
        }
        
        this.element.addEventListener('click', this._clickHandler.bind(this), { capture: true });
        
        this._clueInitialization();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the click event of the element.
     *
     * @param { MouseEvent } event
     *
     * @return { void }
     **/
    async _clickHandler(event)
    {
        this._toggleProcessing();
        
        if (this.isAnchor())
        {
            event.preventDefault();
            
            event.stopPropagation();
        }
        
        if (this.isConfirm() && !(await app.confirmModal.confirm()))
        {
            event.preventDefault();
            
            event.stopPropagation();
            
            return ;
        }

        if (this.settings.href)
        {
            location.href = convertToFullUrl(this.settings.href);
        }

        this.customEvents.execute(ButtonEventsClassifier.CLICK, event, this);
    }
    
    /**
     * @private
     *
     * @description Implements process of the toggle.
     *
     * @return { void }
     **/
    _toggleProcessing()
    {
        if (!this.isToggle())
        {
            return ;
        }
        
        this.customEvents.execute(ButtonEventsClassifier.BEFORE_TOGGLE, this);
        
        this.toggle();
        
        this.customEvents.execute(ButtonEventsClassifier.TOGGLE, this.hasToggle(), this);
    }
    
    /**
     * @private
     *
     * @description Creates and returns html node of the element.
     *
     * @return { HTMLButtonElement }
     **/
    _createElement()
    {
        const nodes = [];
        
        if (this.withIcon())
        {
            this.icon = this._createIcon();
            
            nodes.push(this.icon);
        }

        if (!isEmpty(this.settings.text))
        {
            this.text = this._createText();
            
            nodes.push(this.text);
        }
        
        return createElement('button', { class: this.settings.elementClass, ...this.settings.attributes, name: this.settings.elementName }, nodes);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the icon element.
     *
     * @param { string ? } iconId
     *
     * @return { SVGElement }
     **/
    _createIcon(iconId)
    {
        return createSvgElement(iconId || this.settings.iconId, { class: this.settings.iconClass });
    }
    
    /**
     * @public
     *
     * @description Creates a new icon by the specified id and replaces old icon with the new one.
     *
     * @param { string } iconId
     *
     * @return { void }
     **/
    changeIcon(iconId)
    {
        const icon = this._createIcon(iconId);
        
        this.element.replaceChild(icon, this.icon);
        
        this.icon = icon;
    }
    
    /**
     * @private
     *
     * @description Creates html node of the loading icon element.
     *
     * @return { SVGElement }
     **/
    _createLoadingIcon()
    {
        return createSvgElement(this.settings.loadingIconId, { class: this.settings.loadingIconClass });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the text element.
     *
     * @return { Text | HTMLElement }
     **/
    _createText()
    {
        if (this.withIcon())
        {
            return createElement('span', { class: this.settings.textClass }, [ this.settings.text ]);
        }
        
        return createText(this.settings.text);
    }
    
    /**
     * @private
     *
     * @description Implements initialize clue component.
     *
     * @return { void }
     **/
    _clueInitialization()
    {
        if (isEmpty(this.settings.clueSettings))
        {
            return ;
        }
        
        this.clue = new Clue(this.element, this.settings.clueSettings);
        
        this.clue.initialization();
    }
    
    /**
     * @public
     *
     * @description Appends the given element to the current element.
     *
     * @param { Element } value
     *
     * @return { void }
     **/
    append(value)
    {
        this.element.append(value);
    }
    
    /**
     * @public
     *
     * @description Inserts the specified element directly after the current element.
     *
     * @param { Element } value
     *
     * @return { void }
     **/
    after(value)
    {
        this.element.after(value);
    }
    
    /**
     * @public
     *
     * @description Determines whether icon is needed.
     *
     * @return { boolean }
     **/
    withIcon()
    {
        return !isEmpty(this.settings.iconId);
    }
    
    /**
     * @public
     *
     * @description Sets the given value of an attribute to current element.
     *
     * @param { string } qualifiedName
     *
     * @param { string } value
     *
     * @return { void }
     **/
    setAttribute(qualifiedName, value)
    {
        setAttribute(this.element, qualifiedName, value);
    }
    
    /**
     * @public
     *
     * @description Returns attribute by the given qualifiedName.
     *
     * @param { string } qualifiedName
     *
     * @return { string }
     **/
    getAttribute(qualifiedName)
    {
        return getAttribute(this.element, qualifiedName);
    }
    
    /**
     * @public
     *
     * @description Removes the attribute by the given qualifiedName.
     *
     * @param { string } qualifiedName
     *
     * @return { void }
     **/
    removeAttribute(qualifiedName)
    {
        removeAttribute(this.element, qualifiedName);
    }
    
    /**
     * @public
     *
     * @description Checks if the window confirm is needed.
     *
     * @return { boolean }
     **/
    isConfirm()
    {
        return this.settings.isConfirm;
    }
    
    /**
     * @public
     *
     * @description Implements toggle.
     *
     * @param { boolean ? } force
     *
     * @return { void }
     **/
    toggle(force)
    {
        this.setModifier(ButtonModifiersClassifier.TOGGLE, isUndefined(force) ? !this.hasToggle() : force);
    }
    
    /**
     * @public
     *
     * @description Checks if the toggle logic is needed.
     *
     * @return { boolean }
     **/
    isToggle()
    {
        return this.settings.isToggle;
    }
    
    /**
     * @public
     *
     * @description Determines whether a button has been pressed.
     *
     * @return { boolean }
     **/
    hasToggle()
    {
        return this.hasModifier(ButtonModifiersClassifier.TOGGLE);
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to the element by the given force.
     *
     * @param { string } modifier
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setModifier(modifier, force)
    {
        this.element.classList.toggle(modifier, force);
    }
    
    /**
     * @public
     *
     * @description Check if the element contains the given modifier.
     *
     * @param { string } modifier
     *
     * @return { boolean }
     **/
    hasModifier(modifier)
    {
        return this.element.classList.contains(modifier);
    }
    
    /**
     * @public
     *
     * @description Returns element.
     *
     * @return { HTMLButtonElement }
     **/
    getElement()
    {
        return this.element;
    }
    
    /**
     * @public
     *
     * @description Returns name of the element.
     *
     * @return { string }
     **/
    getName()
    {
        return this.settings.elementName;
    }
    
    /**
     * @public
     *
     * @description Returns custom id.
     *
     * @return { string | number }
     **/
    getCustomId()
    {
        return this.settings.customId;
    }
    
    /**
     * @public
     *
     * @description Sets loading state by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    loading(force)
    {
        if (!this.loadingIcon)
        {
            this.loadingIcon = this._createLoadingIcon();
        }
        
        this.clue && this.clue.hide();
        
        const getChild = (force) => force ? this.loadingIcon : (this.icon || this.text);
        
        this.getElement().replaceChild(getChild(force), getChild(!force));
        
        this.setModifier(ButtonModifiersClassifier.LOADING, force);
    }
    
    /**
     * @public
     *
     * @description Sets disable state by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    disable(force)
    {
        this.clue && this.clue.hide();
        
        this.setModifier(ButtonModifiersClassifier.DISABLE, force);
    }
    
    /**
     * @public
     *
     * @description Determines whether an element is an anchor.
     *
     * @return { boolean }
     **/
    isAnchor()
    {
        return this.element.nodeName === 'A';
    }
    
    /**
     * @public
     *
     * @description Removes element from dom.
     *
     * @return { void }
     **/
    remove()
    {
        this.element.remove();
    }
    
    /**
     * @public
     *
     * @description Added the given class names to the current element.
     *
     * @param { Array<string> } classes
     *
     * @return { void }
     **/
    setClasses(classes)
    {
        setClasses(this.getElement(), classes);
    }
    
    /**
     * @public
     *
     * @description Returns instance by the given element.
     *
     * @param { HTMLButtonElement } element
     *
     * @return { Button | null }
     **/
    static getInstanceByTheElement(element)
    {
        return this.instances.find(a => a.element === element);
    }
    
    /**
     * @public
     *
     * @description Returns instance by the given custom id.
     *
     * @param { string | number } customId
     *
     * @return { Button | null }
     **/
    static getInstanceByTheCustomId(customId)
    {
        return this.instances.find(a => a.settings.customId === customId);
    }
}
