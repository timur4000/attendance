import { TableEarsSettings } from './TableEarsSettings.js';
import { TableEar }          from './TableEar.js';
import { createFragment }    from '../../../tea-modules/Functions/DOM/Elements/createFragment.js';
import { CustomEvents }      from '../../../tea-modules/Classes/CustomEvents/CustomEvents.js';
import { TableEventTypesClassifier } from '../Standards/TableEventTypesClassifier.js';
import { TableStateTypesClassifier } from '../Standards/TableStateTypesClassifier.js';
import { AnimateDuration }                  from '../../../tea-modules/Classes/Animates/AnimateDuration.js';
import { TableEarDirectionTypesClassifier } from './TableEarDirectionTypesClassifier.js';


/**
 * @class
 *
 * @description Implements management for the table ears component.
 **/
export class TableEars
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
     * @type { Object<Table> }
     **/
    table;
    
    /**
     * @public
     *
     * @type { TableEarsSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { TableEar }
     **/
    rightEar;
    
    /**
     * @public
     *
     * @type { TableEar }
     **/
    leftEar;
    
    /**
     * @public
     *
     * @type { AnimateDuration }
     **/
    animate;
    
    /**
     * @public
     *
     * @type { number }
     **/
    scroll = 0;
    
    /**
     * @public
     *
     * @type { TableEarDirectionTypesClassifier }
     **/
    direction;
    
    /**
     * @constructor
     *
     * @param { Object<Table> } table
     *
     * @param { TableEarsSettingProperties ? } settings
     *
     * @return { TableEars }
     **/
    constructor(table, settings = {})
    {
        this.customEvents = new CustomEvents();
        
        this.table = table;
        
        this.settings = new TableEarsSettings(settings);
        
        this.rightEar = new TableEar(table, this.settings.rightEarSettings);
        
        this.leftEar = new TableEar(table, this.settings.leftEarSettings);
        
        this.animate = new AnimateDuration(this._animateDrawCallback.bind(this), this.settings.animateDuration);
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logics.
     *
     * @return { void }
     **/
    initialization()
    {
        this.rightEar.initialization();
        
        this.leftEar.initialization();
        
        document.addEventListener('scroll', this._scrollHandler.bind(this));
        
        window.addEventListener('resize', this._resizeHandler.bind(this));
        
        this.rightEar.customEvents.subscribe(TableEventTypesClassifier.EAR_MOUSEENTER, this._rightEarMouseenterHandler.bind(this));
        
        this.rightEar.customEvents.subscribe(TableEventTypesClassifier.EAR_MOUSELEAVE, this._rightEarMouseleaveHandler.bind(this));
        
        this.leftEar.customEvents.subscribe(TableEventTypesClassifier.EAR_MOUSEENTER, this._leftEarMouseenterHandler.bind(this));
        
        this.leftEar.customEvents.subscribe(TableEventTypesClassifier.EAR_MOUSELEAVE, this._leftEarMouseleaveHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the document scroll event.
     *
     * @return { void }
     **/
    _scrollHandler()
    {
        this.customEvents.execute(TableEventTypesClassifier.EARS_SCROLL, this);
    }
    
    /**
     * @private
     *
     * @description Implements handler for the window resize event.
     *
     * @return { void }
     **/
    _resizeHandler()
    {
        this.customEvents.execute(TableEventTypesClassifier.EARS_RESIZE, this);
    }
    
    /**
     * @private
     *
     * @description Implements callback for the animate draw.
     *
     * @param { number } fraction
     *
     * @return { void }
     **/
    _animateDrawCallback(fraction)
    {
        this._scrollProcessing();
        
        this._scrollPostProcessing();
        
        this.setScrollLeft();
    }
    
    /**
     * @private
     *
     * @description Implements process with the scroll property.
     *
     * @return { void }
     **/
    _scrollProcessing()
    {
        switch (this.direction)
        {
            case TableEarDirectionTypesClassifier.RIGHT:
            {
                this.scroll += this.settings.animateStep;
                
                break ;
            }
            case TableEarDirectionTypesClassifier.LEFT:
            {
                this.scroll -= this.settings.animateStep;
                
                break ;
            }
        }
    }
    
    /**
     * @private
     *
     * @description Implements post process with the scroll property.
     *
     * @return { void }
     **/
    _scrollPostProcessing()
    {
        if (this.scroll < 0)
        {
            this.scroll = 0;
            
            this.animate.stop();
        }
        
        if (this.getPureScrollWidth() < this.scroll)
        {
            this.animate.stop();
            
            this.scroll = this.getPureScrollWidth();
        }
    }
    
    /**
     * @private
     *
     * @description Implements handler for the right ear mouseenter event.
     *
     * @return { void }
     **/
    _rightEarMouseenterHandler()
    {
        this.direction = TableEarDirectionTypesClassifier.RIGHT;
        
        this.animate.infinity();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the right ear mouseleave event.
     *
     * @return { void }
     **/
    _rightEarMouseleaveHandler()
    {
        this.animate.stop();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the left ear mouseenter event.
     *
     * @return { void }
     **/
    _leftEarMouseenterHandler()
    {
        this.direction = TableEarDirectionTypesClassifier.LEFT;
        
        this.animate.infinity();
    }
    
    /**
     * @private
     *
     * @description Implements handler for the left ear mouseleave event.
     *
     * @return { void }
     **/
    _leftEarMouseleaveHandler()
    {
        this.animate.stop();
    }
    
    /**
     * @public
     *
     * @description Returns fragment with all ears.
     *
     * @return { DocumentFragment }
     **/
    getEars()
    {
        const fragment = createFragment();
        
        fragment.append(this.rightEar.getElement(), this.leftEar.getElement())
        
        return fragment;
    }
    
    /**
     * @public
     *
     * @description Implements switch modifier on the given TableEar by the given condition.
     *
     * @param { TableEar } tableEar
     *
     * @param { TableEarTypesClassifier | TableStateTypesClassifier } modifier
     *
     * @param { boolean } condition
     *
     * @return { void }
     **/
    toggleModifier(tableEar, modifier,  condition)
    {
        tableEar.setModifier(modifier, condition);
    }
    
    /**
     * @public
     *
     * @description Implements draw for the all ears.
     *
     * @return { void }
     **/
    drawEars()
    {
        this.rightEar.draw();
        
        this.leftEar.draw();
        
        this.scroll = this.getScrollLeft();
        
        this.toggleModifier(this.rightEar, TableStateTypesClassifier.DISABLED, this.isScrollEnd());
        
        this.toggleModifier(this.leftEar, TableStateTypesClassifier.DISABLED, this.isScrollStart());
    }
    
    /**
     * @public
     *
     * @description Returns pure scroll width of the table element.
     *
     * @return { number }
     **/
    getPureScrollWidth()
    {
        return this.getScrollWidth() - Math.round(this.table.tableElement.getRect().width);
    }
    
    /**
     * @public
     *
     * @description Returns scroll width of the table element.
     *
     * @return { number }
     **/
    getScrollWidth()
    {
        return this.table.tableElement.getElement().scrollWidth;
    }
    
    /**
     * @public
     *
     * @description Returns scroll left of the table element.
     *
     * @return { number }
     **/
    getScrollLeft()
    {
        return Math.round(this.table.tableElement.getElement().scrollLeft);
    }
    
    /**
     * @public
     *
     * @description Sets scroll property to the table element.
     *
     * @return { void }
     **/
    setScrollLeft()
    {
        this.table.tableElement.getElement().scrollLeft = this.scroll;
    }
    
    /**
     * @public
     *
     * @description Check if the scroll has reached the end.
     *
     * @return { boolean }
     **/
    isScrollEnd()
    {
        return this.getPureScrollWidth() <= this.getScrollLeft();
    }
    
    /**
     * @public
     *
     * @description Check if the scroll has reached the start.
     *
     * @return { boolean }
     **/
    isScrollStart()
    {
        return this.getScrollLeft() === 0;
    }
}
