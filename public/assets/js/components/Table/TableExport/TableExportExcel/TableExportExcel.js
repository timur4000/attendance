import { TableExport } from '../TableExport.js';


/**
 * @description Implements export logic of excel.
 *
 * @extends { TableExport }
 **/
export class TableExportExcel extends TableExport
{
    /**
     * @constructor
     *
     * @param { TableExportSettings } settings
     **/
    constructor(settings)
    {
        super(settings);
    }
    
    initialization()
    {
        super.initialization();
    }
}
