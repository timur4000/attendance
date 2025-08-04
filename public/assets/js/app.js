import { CustomEvents } from './tea-modules/Classes/CustomEvents/CustomEvents.js';
import { querySelector } from './tea-modules/Functions/DOM/Queries/querySelector.js';
import { CustomInput } from './components/CustomInput/CustomInput.js';
import { PasswordToggle } from './components/PasswordToggle/PasswordToggle.js';
import { Dropdown } from './components/Dropdown/Dropdown.js';
import { Menu } from './components/Menu/Menu.js';
import { LeftNavigation } from './components/LeftNavigation/LeftNavigation.js';
import { States }             from './tea-modules/Classes/States/States.js';
import { CustomSelect } from './components/CustomSelect/CustomSelect.js';
import { Clue } from './components/Clue/Clue.js';
import { LeftNavigationEventsClassifier } from './components/LeftNavigation/LeftNavigationEventsClassifier.js';
import { Notifications } from './components/Notifications/Notifications.js';
import { AirDatepickerOuter } from './components/AirDatepickerOuter/AirDatepickerOuter.js';
import { en } from './lib/air-datepicker/locale/en.js';
import { CustomNumber } from './components/CustomNumber/CustomNumber.js';
import { createElement } from './tea-modules/Functions/DOM/Elements/createElement.js';
import { Modal } from './components/Modal/Modal.js';
import { Button } from './components/Button/Button.js';
import { Configurations } from './standards/Configurations/Configurations.js';
import { ConfigurationCodesClassifier } from './standards/Classifiers/Configurations/ConfigurationCodesClassifier.js';


export class App
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
     * @type { States }
     **/
    states;
    
    /**
     * @public
     *
     * @type { CustomInput[] }
     **/
    customInputs = [];
    
    /**
     * @public
     *
     * @type { PasswordToggle[] }
     **/
    passwordToggles = [];
    
    /**
     * @public
     *
     * @type { Dropdown[] }
     **/
    dropdowns = [];
    
    /**
     * @public
     *
     * @type { Clue[] }
     **/
    clues = [];
    
    /**
     * @public
     *
     * @type { LeftNavigation }
     **/
    leftNavigation;
    
    /**
     * @public
     *
     * @type { Menu }
     **/
    menu;
    
    /**
     * @public
     *
     * @type { CustomSelect[] }
     **/
    customSelects = [];
    
    /**
     * @public
     *
     * @type { Notifications }
     **/
    notifications;
    
    /**
     * @public
     *
     * @type { Date }
     **/
    date;
    
    /**
     * @public
     *
     * @type { AirDatepickerOuter[] }
     **/
    airDatepickerOuters = [];
    
    /**
     * @public
     *
     * @type { CustomNumber[] }
     **/
    customNumbers = [];
    
    /**
     * @public
     *
     * @type { Modal }
     **/
    confirmModal;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    isFrontendLogs;
    
    constructor()
    {
        this.notifications = new Notifications({});
        
        this.customEvents = new CustomEvents();
        
        this.states = new States();
        
        this.states.noTransition(true);
        
        this.menu = new Menu('#menu');
        
        this.leftNavigation = new LeftNavigation('#left-navigation');
        
        this.date = new Date();
        
        window.app = this;
        
        window.addEventListener('load', this._loadHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Handler for window load event.
     *
     * @return { void }
     **/
    async _loadHandler()
    {
        this.customEvents.execute('app:pre-load');
        
        this._confirmModalInitialization();
        
        this._cluesInitial();
        
        this.customInputsInitial();
        
        this._passwordTogglesInitial();
        
        this._dropdownsInitial();
        
        this.menu.initialization();
        
        this._leftNavigationInitialize();
        
        this._buttonsInitialize();
        
        this.singleCustomSelectsInitial();
        
        await this.airDatepickersInitial();
        
        //this.isFrontendLogs = (await Configurations.get(ConfigurationCodesClassifier.FRONTEND_LOGS)).record.value_integer;

	this.isFrontendLogs = (await Configurations.get(ConfigurationCodesClassifier.FRONTEND_LOGS, 'configuration-frontend-logs', false)).record.value_integer;
        
        this.customNumbersInitial();
        
        this.customEvents.execute('app:load');
        
        setTimeout(() =>
        {
            this.states.noTransition(false);
        });
    }
    
    /**
     * @private
     *
     * @description Implements initialize confirm modal.
     *
     * @return { void }
     **/
    _confirmModalInitialization()
    {
        const template = createElement('template', { 'data-modal-template': 'confirm-template' }, [ 'Do you confirm the action?' ]);
        
        this.confirmModal = new Modal(
            {
                id: 'confirm-template',
                template: template,
                cardSettings:
                    {
                        withUpper: false,
                        cancelButtonSettings: { iconId: 'essential-close', iconClass: 'icon icon-size-12', elementClass: [ 'button--size-large', 'button--type-default', 'button--theme-white-azure-bittersweet', ] },
                        confirmButtonSettings: { iconId: 'essential-check', iconClass: 'icon icon-size-14', elementClass: [ 'button--size-large', 'button--type-default', 'button--theme-white-azure-wild-sand' ] },
                        lowerSettings:
                            {
                                isSingle: true
                            },
                    },
                withOuterCancel: false,
            });
        
        this.confirmModal.initialization();
    }

    /**
     * @private
     *
     * @description Implements initialize left navigation.
     *
     * @return { void }
     **/
    _leftNavigationInitialize()
    {
        this.leftNavigation.customEvents.subscribe(LeftNavigationEventsClassifier.OPEN, this._leftNavigationOpenHandler.bind(this));
        
        this.leftNavigation.customEvents.subscribe(LeftNavigationEventsClassifier.CLOSE, this._leftNavigationCloseHandler.bind(this));
        
        this.leftNavigation.initialization();
    }
    
    /**
     * @private
     *
     * @description Implements initialize buttons.
     *
     * @return { void }
     **/
    _buttonsInitialize()
    {
        const buttons = querySelector('[data-button]', { isAll: true });
        
        buttons.forEach(button => new Button({}, button));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the left navigation open event.
     *
     * @return { void }
     **/
    _leftNavigationOpenHandler()
    {
        this._menuLinksFreezy(true);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the left navigation close event.
     *
     * @return { void }
     **/
    _leftNavigationCloseHandler()
    {
        this._menuLinksFreezy(false);
    }
    
    /**
     * @private
     *
     * @description Implement freezy for the menu links by the given force.
     *
     * @param { boolean } force
     *
     * @return { void }
     **/
    _menuLinksFreezy(force)
    {
        this.menu.links.forEach(link =>
        {
            const clue = Clue.getInstanceByTarget(link);
            
            if (clue)
            {
                clue.update({ freezy: force });
            }
        });
    }
    
    /**
     * @public
     *
     * @description Implements initialize custom select components.
     *
     * @param { Document | Element ? } root
     *
     * @return { void }
     **/
    singleCustomSelectsInitial(root = document)
    {
        const elements = querySelector('[data-custom-select]', { isAll: true, root: root });
        
        for (let i = 0, n = elements.length; i < n; i++)
        {
            const element = elements[ i ];
            
            if (CustomSelect.getInstanceBySelect(element))
            {
                continue ;
            }
            
            const instance = new CustomSelect(element, {});
            
            instance.initialization();
            
            this.customSelects.push(instance);
        }
    }
    
    /**
     * @public
     *
     * @description Implements initialize air datepicker components.
     *
     * @param { Document | Element ? } root
     *
     * @return { void }
     **/
    async airDatepickersInitial(root = document)
    {
        const elements = querySelector('[data-input-date]', { isAll: true, root: root });
        
        for (let i = 0, n = elements.length; i < n; i++)
        {
            const element = elements[i];
            
            const customInput = CustomInput.getInstanceByInputOuter(element);
            
            await AirDatepickerOuter.load();
            
            if (AirDatepickerOuter.getInstanceByTheInputName(customInput.input.name))
            {
                continue ;
            }
            
            const instance = new AirDatepickerOuter(customInput.input, {
                locale: en,
            });
            
            await instance.initialization();
            
            this.airDatepickerOuters.push(instance);
        }
    }
    
    /**
     * @public
     *
     * @description Implements initialize custom number components.
     *
     * @param { Document | Element ? } root
     *
     * @return { void }
     **/
    customNumbersInitial(root = document)
    {
        const elements = querySelector('[data-custom-number]', { isAll: true, root: root });
        
        for (let i = 0, n = elements.length; i < n; i++)
        {
            const element = elements[ i ];
            
            if (CustomNumber.getInstanceByDomElement(element))
            {
                continue ;
            }
            
            const instance = new CustomNumber(element);
            
            instance.initialization();
            
            this.customNumbers.push(instance);
        }
    }
    
    /**
     * @public
     *
     * @description Implements initialize custom input components.
     *
     * @param { Document | Element ? } root
     *
     * @return { void }
     **/
    customInputsInitial(root = document)
    {
        const elements = querySelector('[data-custom-input-hover]', { isAll: true, root: root });
        
        for (let i = 0, n = elements.length; i < n; i++)
        {
            const element = elements[ i ];
            
            if (CustomInput.getInstanceByElement(element))
            {
                continue ;
            }
            
            const instance = new CustomInput(element);
            
            this.customInputs.push(instance);
        }
    }
    
    /**
     * @private
     *
     * @description Implements initialize clue components.
     *
     * @return { void }
     **/
    _cluesInitial()
    {
        const elements = querySelector('[data-clue]', { isAll: true });
        
        elements.forEach(element =>
        {
            const instance = new Clue(element);
            
            instance.initialization();
            
            this.clues.push(instance);
        });
    }
    
    /**
     * @private
     *
     * @description Implements initialise password toggle components.
     *
     * @return { void }
     **/
    _passwordTogglesInitial()
    {
        const elements = querySelector('[data-password-toggle]', { isAll: true });
        
        elements.forEach(element =>
        {
            const instance = new PasswordToggle(element);
            
            this.passwordToggles.push(instance);
        });
    }
    
    /**
     * @private
     *
     * @description Implements initialise dropdown components.
     *
     * @return { void }
     **/
    _dropdownsInitial()
    {
        const elements = querySelector('[data-dropdown]', { isAll: true });
        
        elements.forEach(element =>
        {
            const instance = new Dropdown(element);
            
            this.dropdowns.push(instance);
        });
    }
}
