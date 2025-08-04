import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TerminalSettings } from './TerminalSettings.js';
import { createElement } from '../../tea-modules/Functions/DOM/Elements/createElement.js';
import { createSvgElement } from '../../tea-modules/Functions/DOM/Elements/createSvgElement.js';
import { getPaddings } from '../../tea-modules/Functions/DOM/Styles/getPaddings.js';
import { getMargins } from '../../tea-modules/Functions/DOM/Styles/getMargins.js';
import { getAttribute } from '../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { HttpRequest } from '../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { Button } from '../Button/Button.js';
import { ButtonEventsClassifier } from '../Button/ButtonEventsClassifier.js';
import { TerminalModifiersClassifier } from './TerminalModifiersClassifier.js';
import { trim } from '../../tea-modules/Functions/Strings/trim.js';


/**
 * @class
 *
 * @description Implements logic for the terminal component.
 **/
export class Terminal
{
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    domElement;
    
    /**
     * @public
     *
     * @type { TerminalSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domOutput;
    
    /**
     * @public
     *
     * @type { HTMLParagraphElement[] }
     **/
    domOutputItems = [];
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domInsert;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    domInsertIcon;
    
    /**
     * @public
     *
     * @type { SVGElement }
     **/
    domInsertIconSvg;
    
    /**
     * @public
     *
     * @type { HTMLInputElement }
     **/
    domInsertInput;
    
    /**
     * @public
     *
     * @type { Button }
     **/
    domInsertSend;
    
    /**
     * @public
     *
     * @type { string }
     **/
    url;
    
    /**
     * @constructor
     *
     * @param { string | HTMLElement } selectors
     *
     * @param { TerminalSettingProperties } settings
     *
     * @return { Terminal }
     **/
    constructor(selectors, settings = {})
    {
        this.domElement = querySelector(selectors);
        
        this.settings = new TerminalSettings(settings);
        
        this.domOutput = this._createDomOutput();
        
        this.domInsertIconSvg = this._createDomInsertIconSvg();
        
        this.domInsertIcon = this._createDomInsertIcon();
        
        this.domInsertInput = this._createDomInsertInput();
        
        this.domInsertSend = this._createDomInsertSend();
        
        this.domInsert = this._createDomInsert();
        
        this.url = getAttribute(this.domElement, 'url', { isDataAttribute: true, isAfterRemove: true });
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
        this.domElement.append(this.domOutput, this.domInsert);
        
        this._domElementSizesProcessing();
        
        this._domOutputSizesProcessing();
        
        this.domInsertInput.focus();
        
        this.domInsertSend.customEvents.subscribe(ButtonEventsClassifier.CLICK, this._insertSendClickHandle.bind(this));
        
        this.domInsertInput.addEventListener('keypress', this._insertInputKeypressHandle.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the insert send click event.
     *
     * @return { void }
     **/
    _insertSendClickHandle()
    {
        if (this.isInsertInputEmpty())
        {
            return ;
        }
        
        this.exec();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the insert input keypress event.
     *
     * @param { KeyboardEvent } event
     *
     * @return { void }
     **/
    _insertInputKeypressHandle(event)
    {
        if (this.isInsertInputEmpty())
        {
            return ;
        }
        
        if (event.key === 'Enter')
        {
            this.exec();
        }
    }
    
    /**
     * @private
     *
     * @description Creates html node of the output element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomOutput()
    {
        return createElement('div', { class: this.settings.outputClass });
    }
    
    /**
     * @public
     *
     * @description Creates html node of the output item element.
     *
     * @param { string | Element } node
     *
     * @return { void }
     **/
    createDomOutputItem(node)
    {
        const item = createElement('p', { class: this.settings.outputItemClass });
        
        item.innerHTML = node;
        
        this.domOutput.append(item);
        
        this.domOutputItems.push(item);
    }
    
    /**
     * @private
     *
     * @description Implements sending insert input data to server.
     *
     * @return { Promise<{ output: string }> }
     **/
    _send()
    {
        const request = new HttpRequest(
            {
                url: this.url,
                method: HttpRequestMethodsClassifier.POST,
                data: { command: this.domInsertInput.value },
            });
        
        return request.execute();
    }
    
    /**
     * @async
     *
     * @public
     *
     * @description Executes logic.
     *
     * @return { void }
     **/
    async exec()
    {
        this.domInsertSend.loading(true);
        
        this.setModifier(TerminalModifiersClassifier.LOADING, true);
        
        this.domInsertInput.readOnly = true;
        
        const response = await this._send();
        
        this.createDomOutputItem(trim(response.output, '\n'));
        
        this.domInsertInput.value = '';
        
        this.domInsertInput.readOnly = false;
        
        this.domInsertInput.focus();
        
        this.domInsertSend.loading(false);
        
        this.setModifier(TerminalModifiersClassifier.LOADING, false);
        
        this.domOutput.scrollTo(0, this.domOutput.scrollHeight);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the insert element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomInsert()
    {
        return createElement('div', { class: this.settings.insertClass }, [ this.domInsertIcon, this.domInsertInput, this.domInsertSend.getElement() ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the insert icon element.
     *
     * @return { HTMLDivElement }
     **/
    _createDomInsertIcon()
    {
        return createElement('label', { class: this.settings.insertIconClass, for: this.settings.insertInputId }, [ this.domInsertIconSvg ]);
    }
    
    /**
     * @private
     *
     * @description Creates html node of the insert icon svg element.
     *
     * @return { SVGElement }
     **/
    _createDomInsertIconSvg()
    {
        return createSvgElement(this.settings.insertIconSvgId, { class: this.settings.insertIconSvgClass });
    }
    
    /**
     * @private
     *
     * @description Creates html node of the insert input element.
     *
     * @return { HTMLInputElement }
     **/
    _createDomInsertInput()
    {
        return createElement('input',
            {
            class: this.settings.insertInputClass,
            id: this.settings.insertInputId,
            placeholder: this.settings.insertInputPlaceholder,
            name: this.settings.insertInputName,
        });
    }
    
    /**
     * @private
     *
     * @description Implements processing with sizes of the element.
     *
     * @return { void }
     **/
    _domElementSizesProcessing()
    {
        this.domElement.style.width = this.settings.width ? this.settings.width + 'px' : '100%';
    }
    
    /**
     * @private
     *
     * @description Implements processing with sizes of the output element.
     *
     * @return { void }
     **/
    _domOutputSizesProcessing()
    {
        const rect = this.domElement.getBoundingClientRect();
        
        let height = this.settings.height ? this.settings.height - this.getInsertHeight() : (window.innerHeight - rect.bottom) + getPaddings(this.domOutput).y - this.settings.bottomMargin;

        this.domOutput.style.height = height + 'px';
    }
    
    /**
     * @public
     *
     * @description Returns offset height of the insert element.
     *
     * @return { number }
     **/
    getInsertHeight()
    {
        return this.domInsert.offsetHeight + getMargins(this.domInsert).y;
    }
    
    /**
     * @private
     *
     * @description Creates button component for the insert send.
     *
     * @return { Button }
     **/
    _createDomInsertSend()
    {
        return new Button({ elementClass: [ this.settings.insertSendClass ], iconId: this.settings.insertSendSvgId, iconClass: this.settings.insertSendSvgClass });
    }
    
    /**
     * @public
     *
     * @description Sets the given modifier to classes of the element.
     *
     * @param { TerminalModifiersClassifier } modifier
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
     * @description Checks if the element contains the given modifier.
     *
     * @param { TerminalModifiersClassifier } modifier
     *
     * @return { boolean }
     **/
    hasModifier(modifier)
    {
        this.domElement.classList.contains(modifier);
    }
    
    /**
     * @public
     *
     * @description Checks if the insert input element is an empty.
     *
     * @return { boolean }
     **/
    isInsertInputEmpty()
    {
        return !this.domInsertInput.value;
    }
}
