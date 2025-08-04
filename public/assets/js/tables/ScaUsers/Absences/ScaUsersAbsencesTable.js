import { BaseTable } from '../../BaseTable.js';
import { TableCellTypesClassifier } from '../../../components/Table/Standards/TableCellTypesClassifier.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TableActionTypesClassifier } from '../../../components/Table/Standards/TableActionTypesClassifier.js';
import { TablePositionsClassifier } from '../../../components/Table/Standards/TablePositionsClassifier.js';
import { getAttribute } from '../../../tea-modules/Functions/DOM/Attributes/getAttribute.js';
import { HttpRequest } from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { NotificationItemTypesClassifier } from '../../../components/Notifications/Classifiers/NotificationItemTypesClassifier.js';
import { NotificationItemThemesClassifier } from '../../../components/Notifications/Classifiers/NotificationItemThemesClassifier.js';


/**
 * @class
 *
 * @description Implements logic for the sca users absences table.
 **/
export class ScaUsersAbsencesTable extends BaseTable
{
    /**
     * @inheritDoc
     **/
    selectors = '#sca-user-absences-table';
    
    /**
     * @inheritDoc
     **/
    url = 'admin/absences/records-json';
    
    /**
     * @inheritDoc
     **/
    withPagination = false;
    
    /**
     * @public
     *
     * @type { number }
     **/
    idUser;
    
    /**
     * @public
     *
     * @type { string }
     **/
    deleteAction;
    
    /**
     * @inheritDoc
     **/
    constructor()
    {
        super();
        
        this.element = querySelector(this.selectors);
        
        this.idUser = parseInt(getAttribute(this.element, 'id-user', { isDataAttribute: true, isAfterRemove: true }));
        
        this.deleteAction = getAttribute(this.element, 'delete-action', { isDataAttribute: true, isAfterRemove: true });
        
        this.data = { 'id_user': this.idUser };
    }
    
    /**
     * @inheritDoc
     **/
    async actionButtonClickHandler(event, button, tableCell, tableElement, table)
    {
        const idRow = getAttribute(button.getElement(), 'id-row', { isDataAttribute: true });

        if (!idRow)
        {
            return ;
        }

        if (button.clue)
        {
            button.clue.hide();
        }
        
        button.loading(true);

        const request = new HttpRequest(
            {
                url: this.deleteAction,
                method: HttpRequestMethodsClassifier.DELETE,
                data:
                    {
                        'id_row': parseInt(idRow),
                    },
            }
        );

        const response = await request.execute();

        if (response.record && response.record.number === 0)
        {
            app.notifications.create(
                {
                    heading: 'Success',
                    type: NotificationItemTypesClassifier.DEFAULT,
                    theme: NotificationItemThemesClassifier.SUCCESS,
                    withClose: true,
                    svgId: 'essential-verify',
                });

            this.table.update();
        }
    }
    
    /**
     * @inheritDoc
     **/
    getButtons()
    {
        return [
            {
                position: TablePositionsClassifier.TOP_RIGHT,
                type: TableActionTypesClassifier.DEFAULT,
                buttonSettings:
                    {
                        elementName: 'table-record-add',
                        iconId: 'essential-add-square',
                        type: TableActionTypesClassifier.DEFAULT,
                        isConfirm: false,
                        clueSettings: { text: 'New record', },
                        attributes: { 'data-modal-id': 'absence-create-modal', },
                    },
            },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    getActions()
    {
        return [
            {
                type: TableActionTypesClassifier.ALERT,
                buttonSettings:
                    {
                        iconId: 'essential-trash',
                        clueSettings: { text: 'Delete', },
                        isConfirm: true,
                        attributes: { 'data-id-row': '{id_row}' },
                    },
            },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    getColumns()
    {
        return [
            { name: 'id_row', label: 'Id', type: TableCellTypesClassifier.NUMBER, isSortable: false },
            { name: 'name_user_invoker', label: 'Name invoker', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'date_create', label: 'Date create', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'date_start', label: 'Date start', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'date_end', label: 'Date end', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'note_entity', label: 'Note entity', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'note_absence', label: 'Note', type: TableCellTypesClassifier.STRING, isSortable: false },
            { name: 'is_active', label: 'Is active', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
            { name: 'is_future', label: 'Is future', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
            { name: 'is_past', label: 'Is past', type: TableCellTypesClassifier.BOOLEAN, isSortable: false },
        ];
    }
    
    /**
     * @inheritDoc
     **/
    initialization()
    {
        this.tableInitializeProcessing();
    }
}
