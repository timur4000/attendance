import { CustomSelect } from './CustomSelect.js';


export class SingleCustomSelect extends CustomSelect
{
    /**
     * @constructor
     *
     * @param { string | HTMLElement } selector
     *
     * @param { CustomSelectSettingsItems ? } settings
     *
     * @return { SingleCustomSelect }
     **/
    constructor(selector, settings)
    {
        super(selector, settings);
    }
}
