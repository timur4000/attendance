export class FormGroup
{
    /**
     * @public
     *
     * @type { FormGroupSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { HTMLDivElement }
     **/
    element;
    
    /**
     * @constructor
     *
     * @param { FormGroupSettings } settings
     **/
    constructor(settings)
    {
        this.settings = settings;
    }
    
    /**
     * @public
     *
     * @description Implements initialize base methods and logic.
     *
     * @return { void }
     **/
    initialization()
    {
        console.log(this);
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
        return this.element;
    }
}
