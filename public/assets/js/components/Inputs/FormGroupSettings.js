import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';


export class FormGroupSettings
{
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
