import { TableExportExcelSettings } from '../TableExportExcel/TableExportExcelSettings.js';
import { TableExportExcel }         from '../TableExportExcel/TableExportExcel.js';
import { isStructureEmpty }         from '../../../../tea-modules/Functions/Is/isStructureEmpty.js';


/**
 * @description Implements manage of the all TableExport classes.
 **/
export class TableExportManager
{
    /**
     * @public
     *
     * @type { TableExportManagerSettings }
     **/
    settings;
    
    /**
     * @public
     *
     * @type { Object<Table> }
     **/
    table;
    
    /**
     * @public
     *
     * @type { TableExportExcel }
     **/
    excel;
    
    /**
     * @public
     *
     * @type { Array<TableExport> }
     **/
    exports = [];
    
    /**
     * @constructor
     *
     * @param { TableExportManagerSettings } settings
     **/
    constructor(settings)
    {
        this.settings = settings;
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
        this._excelProcessing();
        
        this._exportsProcessing();
        
        console.log(this);
    }
    
    /**
     * @public
     *
     * @description Sets the given table to the current class.
     *
     * @param { Object<Table> } table
     **/
    setTable(table)
    {
        this.table = table;
    }
    
    /**
     * @private
     *
     * @description Implements process of the Excel.
     *
     * @return { void }
     **/
    _excelProcessing()
    {
        if (isStructureEmpty(this.settings.tableExportExcelSettings.dataVariables) && !isStructureEmpty(this.settings.dataVariables))
        {
            this.settings.tableExportExcelSettings.dataVariables = this.settings.dataVariables;
        }
        
        const settings = new TableExportExcelSettings(this.settings.tableExportExcelSettings);
        
        this.excel = new TableExportExcel(settings);
        
        this.exports.push(this.excel);
    }
    
    /**
     * @private
     *
     * @description Implements process of the all exports.
     *
     * @return { void }
     **/
    _exportsProcessing()
    {
        this.exports.forEach(this._exportsProcessingHandler.bind(this));
    }
    
    /**
     * @private
     *
     * @description Implements handler for the exports processing.
     *
     * @param { TableExport } tableExport
     *
     * @return { void }
     **/
    _exportsProcessingHandler(tableExport)
    {
        tableExport.initialization();
        
        tableExport.setTable(this.table);
        
        this.table.appendToLines(tableExport.button.getElement(), tableExport.settings.tablePosition);
    }
}
