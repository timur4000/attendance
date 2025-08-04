import { TableExportSettings } from '../TableExportSettings.js';
import { CluePositionsClassifier } from '../../../Clue/CluePositionsClassifier.js';


/**
 * @description Contains all possible settings of the TableExportExcel class.
 **/
export class TableExportExcelSettings extends TableExportSettings
{
    /**
     * @typedef { TableExportSetting } TableExportExcelSetting
     **/
    
    /**
     * @inheritDoc
     **/
    buttonIconId = 'document-file-excel-line';
    
    /**
     * @inheritDoc
     **/
    buttonClueSettings =
        {
            text: 'Export to excel',
            position: CluePositionsClassifier.TOP,
        };
    
    /**
     * @constructor
     *
     * @param { TableExportSetting } settings
     **/
    constructor(settings)
    {
        super(settings);
    }
}
