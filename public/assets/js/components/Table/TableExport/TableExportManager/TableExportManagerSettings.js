import { structureMerge } from '../../../../tea-modules/Functions/Structures/structureMerge.js';


/**
 * @description Contains all possible settings of the TableExportManager class.
 **/
export class TableExportManagerSettings
{
    /**
     * @typedef { Object } TableExportManagerSetting
     *
     * @property { boolean } [withExcel=true]
     *
     * @property { TableExportExcelSetting } [tableExportExcelSettings]
     *
     * @property { boolean } [withPdf=false]
     *
     * @property { boolean } [withCsv=false]
     *
     * @property { Array<string> } [dataVariables]
     **/
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withExcel = true;
    
    /**
     * @public
     *
     * @type { TableExportExcelSetting }
     **/
    tableExportExcelSettings = {};
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withPdf = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withCsv = false;
    
    /**
     * @public
     *
     * @type { Array<string> }
     **/
    dataVariables = [];
    
    /**
     * @constructor
     *
     * @param { TableExportManagerSetting } settings
     **/
    constructor(settings)
    {
        structureMerge(this, settings);
    }
}
