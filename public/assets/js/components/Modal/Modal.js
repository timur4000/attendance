import { ModalSettings } from './ModalSettings.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { getAttribute }  from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { ModalCard }     from './ModalCard/ModalCard.js';
import { ModalStatesClassifier } from './Classifiers/ModalStatesClassifier.js';
import { getTransition } from '../../tea-modules/Functions/DOM/Styles/getTransition.js';
import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { CustomEvents } from '../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { ModalEventsClassifier }      from './Classifiers/ModalEventsClassifier.js';
import { KeyboardKeyNamesClassifier } from '../../tea-modules/Classes/Standards/Keyboard/KeyboardKeysClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the modal component.
 **/
export class Modal
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
     * @type { ModalSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    wrapper;
    
    /**
     * @public
     *
     * @type { ModalCard }
     **/
    card;
    
    /**
     * @public
     *
     * @type { HTMLTemplateElement }
     **/
    template;
    
    /**
     * @public
     *
     * @type { number }
     **/
    _timeout;
    
    /**
     * @private
     *
     * @type { HTMLElement }
     **/
    _lastTrigger;
    
    /**
     * @private
     *
     * @type { function(function, boolean) }
     **/
    _confirmPromiseResolveCallback;
    
    /**
     * @private
     *
     * @type { function(function, boolean) }
     **/
    _confirmPromiseResolveCloseCallback;
    
    /**
     * @constructor
     *
     * @param { ModalSettingProperties } settings
     *
     * @return { Modal }
     **/
    constructor(settings = {})
    {
        this.customEvents = new CustomEvents();
        
        this.settings = new ModalSettings(settings);
        
        this.card = new ModalCard(this.settings.cardSettings);
        
        this.wrapper = this._createWrapper();
        
        this.element = this._createElement();
        
        this.template = this._getTemplate();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the document click event.
     *
     * @param { Element } target
     *
     * @return { void }
     **/
    _documentClickHandler({ target })
    {
        const trigger = this._lastTrigger = target.closest(`[${ this.settings.idAttribute }]`);
        
        const confirm = target.closest(`[${ this.card.settings.confirmButtonAttribute }]`);
        
        const cancel = target.closest(`[${ this.card.settings.cancelButtonAttribute }]`);
        
        if (confirm && this.isDisplay())
        {
            this.customEvents.execute(ModalEventsClassifier.CONFIRM);
        }
        
        if (this.settings.withOuterCancel && [ this.element, this.wrapper ].includes(target) || cancel && this.isDisplay())
        {
            this.customEvents.execute(ModalEventsClassifier.CANCEL);
            
            this.close();
            
            return ;
        }
        
        if (!trigger || this.getId() !== this.getElementId(trigger))
        {
            return ;
        }
        
        this.open();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the keyup event of the document.
     *
     * @param { KeyboardEvent.key } event
     *
     * @return { void }
     **/
    _documentKeyupHandler({ key })
    {
        if (!this.isDisplay() || !this.settings.withOuterCancel || key !== KeyboardKeyNamesClassifier.ESCAPE)
        {
            return ;
        }
        
        this.close();
    }
    
    /**
     * @private
     *
     * @description Creates and returns html node of the element.
     *
     * @return { HTMLDivElement }
     **/
    _createElement()
    {
        return createElement('div', { class: this.settings.elementClass }, [ this.wrapper ]);
    }
    
    /**
     * @private
     *
     * @description Creates and returns html node of the wrapper element.
     *
     * @return { HTMLDivElement }
     **/
    _createWrapper()
    {
        return createElement('div', { class: this.settings.wrapperClass }, [ this.card.element ]);
    }
    
    /**
     * @private
     *
     * @description Implement inserting element to the document.
     *
     * @return { void }
     **/
    _insertElement()
    {
        document.body.append(this.element);
    }
    
    /**
     * @private
     *
     * @description Implement removing element from the document.
     *
     * @return { void }
     **/
    _removeElement()
    {
        this.element.remove();
    }
    
    /**
     * @private
     *
     * @description Finds and returns the template element.
     *
     * @return { HTMLTemplateElement }
     **/
    _getTemplate()
    {
        return this.settings.template || querySelector(`[${ this.settings.templateAttribute }=${ this.getId() }]`);
    }
    
    /**
     * @private
     *
     * @description Returns content of template.
     *
     * @return { DocumentFragment | string }
     **/
    getTemplateContent()
    {
        return !!this.template.content.firstElementChild ? this.template.content : this.template.innerText;
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
        this.template.remove();
        
        document.addEventListener('click', this._documentClickHandler.bind(this));
        
        document.addEventListener('keyup', this._documentKeyupHandler.bind(this));
        
        this.card.initialization();
        
        this.card.middle.element.append(this.getTemplateContent());
    }
    
    /**
     * @public
     *
     * @description Opens the modal.
     *
     * @return { void }
     **/
    open()
    {
        clearTimeout(this._timeout);
        
        this._insertElement();
        
        setTimeout(() =>
        {
            this.setState(ModalStatesClassifier.DISPLAY, true);
            
            this.customEvents.execute(ModalEventsClassifier.DISPLAY, this);
        }, 5);
        
        this.customEvents.execute(ModalEventsClassifier.OPEN, this);
    }
    
    /**
     * @public
     *
     * @description Closes the modal.
     *
     * @return { void }
     **/
    close()
    {
        const transition = this.getTransition('all');
        
        this.setState(ModalStatesClassifier.DISPLAY, false);
        
        this._timeout = setTimeout(() =>
        {
            this._removeElement();
            
            if (this.card.cancel && this.card.cancel.clue)
            {
                this.card.cancel.clue.hide();
            }
            
            if (this.card.confirm && this.card.confirm.clue)
            {
                this.card.confirm.clue.hide();
            }
            
            this.customEvents.execute(ModalEventsClassifier.UN_DISPLAY);
        }, transition.duration);
        
        this.customEvents.execute(ModalEventsClassifier.CLOSE);
    }
    
    /**
     * @public
     *
     * @description Implements confirm logic.
     *
     * @return { Promise<void> }
     **/
    async confirm()
    {
        this.open();
        
        return new Promise(this._confirmPromiseHandler.bind(this));
    }
    
    /**
     * @public
     *
     * @description Implements a promise handler for the confirm method.
     *
     * @param { Function } resolve
     *
     * @param { Function } reject
     *
     * @return { Promise<void> }
     **/
    _confirmPromiseHandler(resolve, reject)
    {
        this._confirmPromiseResolveCallback = this._confirmPromiseResolveHandler.bind(this, resolve, true);
        
        this._confirmPromiseResolveCloseCallback = this._confirmPromiseResolveHandler.bind(this, resolve, false);
        
        this.customEvents.subscribe(ModalEventsClassifier.CONFIRM, this._confirmPromiseResolveCallback, { isOnce: true });
        
        this.customEvents.subscribe(ModalEventsClassifier.CLOSE, this._confirmPromiseResolveCloseCallback, { isOnce: true });
    }
    
    /**
     * @private
     *
     * @description Implements a resolve handler for the confirm promise handler method.
     *
     * @param { Function } resolve
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    _confirmPromiseResolveHandler(resolve, force)
    {
        const type = force ? ModalEventsClassifier.CLOSE : ModalEventsClassifier.CONFIRM;
        
        const callback = force ? this._confirmPromiseResolveCloseCallback : this._confirmPromiseResolveCallback;
        
        this.customEvents.unsubscribe(type, callback);
        
        if (force)
        {
            this.close();
        }
        
        resolve(force);
    }
    
    /**
     * @public
     *
     * @description Returns id from the settings.
     *
     * @return { string }
     **/
    getId()
    {
        return this.settings.id;
    }
    
    /**
     * @public
     *
     * @description Returns id of the given element.
     *
     * @param { HTMLElement } element
     *
     * @return { string }
     **/
    getElementId(element)
    {
        return getAttribute(element, this.settings.idAttribute);
    }
    
    /**
     * @public
     *
     * @description Sets the given state to the element by the force.
     *
     * @param { ModalStatesClassifier } value
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    setState(value, force)
    {
        this.element.classList.toggle(value, force);
    }
    
    /**
     * @public
     *
     * @description Checks if the element contains the given state.
     *
     * @param { ModalStatesClassifier } value
     *
     * @return { boolean }
     **/
    checkState(value)
    {
        return this.element.classList.contains(value);
    }
    
    /**
     * @public
     *
     * @description Checks if the element state is a display.
     *
     * @return { boolean }
     **/
    isDisplay()
    {
        return this.checkState(ModalStatesClassifier.DISPLAY);
    }
    
    /**
     * @public
     *
     * @description Returns transition properties of the element.
     *
     * @param { string ? } property
     *
     * @return { Transition | Transition[] }
     **/
    getTransition(property = 'all')
    {
        return getTransition(this.element, property);
    }
    
    /**
     * @public
     *
     * @description Returns last trigger.
     *
     * @return { HTMLElement }
     **/
    getTrigger()
    {
        return this._lastTrigger;
    }
    
    /**
     * @public
     *
     * @description Returns element.
     *
     * @return { HTMLElement }
     **/
    getElement()
    {
        return this.element;
    }
    
    /**
     * @public
     *
     * @description Implements freezy middle section by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    middleFreezy(force)
    {
        this.setState(ModalStatesClassifier.MIDDLE_FREEZY, force);
    }
    
    /**
     * @public
     *
     * @description Implements freezy modal card by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    freeze(force)
    {
        this.setState(ModalStatesClassifier.FREEZY, force);
    }
}
