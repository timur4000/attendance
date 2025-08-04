import { querySelector } from '../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { toClipboard }   from '../../tea-modules/Functions/Clipboard/toClipboard.js';
import { NotificationItemThemesClassifier } from '../Notifications/Classifiers/NotificationItemThemesClassifier.js';


/**
 * @class
 *
 * @description Implements logic for sprite icons.
 **/
export class SpriteIcons
{
    /**
     * @public
     *
     * @type { HTMLElement }
     **/
    element;
    
    /**
     * @constructor
     *
     * @param { string } selectors
     *
     * @return { SpriteIcons }
     **/
    constructor(selectors)
    {
        this.element = querySelector(selectors);
    }
    
    /**
     * @public
     *
     * @description Implements base logic.
     *
     * @return { void }
     **/
    initialization()
    {
        this.element.addEventListener('click', this._elementClickHandler.bind(this));
    }
    
    /**
     * @public
     *
     * @description Implements handler for element click event.
     *
     * @param { EventTarget }
     *
     * @return { void }
     **/
    _elementClickHandler({ target })
    {
        const clipboardButton = target.closest('[data-icons-grid-clipboard]');
        
        if (clipboardButton)
        {
            toClipboard(clipboardButton.dataset.id);
            
            app.notifications.create(
                {
                    heading: 'Successfully copied!',
                    svgId: 'essential-verify',
                    theme: NotificationItemThemesClassifier.SUCCESS,
                }
            );
        }
    }
}
