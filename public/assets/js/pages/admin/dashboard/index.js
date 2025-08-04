import { App } from '../../../app.js';
import { Table } from '../../../components/Table/Table.js';
import { TableCellTypesClassifier } from '../../../components/Table/Standards/TableCellTypesClassifier.js';
import { TableActionTypesClassifier } from '../../../components/Table/Standards/TableActionTypesClassifier.js';
import { HttpRequest } from '../../../tea-modules/Classes/Requests/HttpRequest.js';
import { HttpRequestMethodsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestMethodsClassifier.js';
import { HttpRequestEventsClassifier } from '../../../tea-modules/Classes/Requests/Standards/HttpRequestEventsClassifier.js';
import { querySelector } from '../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { TablePositionsClassifier } from '../../../components/Table/Standards/TablePositionsClassifier.js';
import { Modal } from '../../../components/Modal/Modal.js';
import { ModalEventsClassifier } from '../../../components/Modal/Classifiers/ModalEventsClassifier.js';
import { Dashboard } from '../../../components/Dashboard/Dashboard.js';


const app = new App();

console.log(app);

app.customEvents.subscribe('app:load', function ()
{
    const dashboard = new Dashboard();
    
    dashboard.initialization();
    
    // const a = querySelector('#date');
    //
    // const inputElement = document.getElementById('date');
    //
    // document.addEventListener('keyup', function(event) {
    //     console.log('Событие keyup перехвачено на уровне document');
    // });
    //
    // const keyupEvent = new KeyboardEvent('keyup', { bubbles: true, composed: true });
    //
    // inputElement.dispatchEvent(keyupEvent);
    
    // inputElement.value = '123';
    
    // new AirDatepicker(a, {
    //     // inline: true,
    //     range: true,
    //     autocomplete: false,
    //     maxDate: new Date(),
    // });
    
    // const modal = new Modal({
    //     id: 'testing-call',
    //     cardSettings:
    //         {
    //             heading: 'Headings',
    //             lowerSettings:
    //                 {
    //                     isSingle: true
    //                 },
    //             cancelButtonSettings: { text: 'Cancel', elementClass: [ 'button--size-middle', 'button--type-default', 'button--theme-white-azure-bittersweet', ] },
    //             confirmButtonSettings: { iconId: 'essential-check', elementClass: [ 'button--size-middle', 'button--type-square', 'button--theme-white-azure-wild-sand' ], clueSettings: { text: 'Confirm' } },
    //         },
    //
    // });
    //
    // modal.initialization();
    
    // const table = new Table('#table',
    //     {
    //         httpRequestSettings:
    //             {
    //                 url: querySelector('#table').dataset.url,
    //                 method: HttpRequestMethodsClassifier.POST,
    //             },
    //         tableElement:
    //             {
    //                 columns:
    //                 [
    //                     { name: 'id_object', label: 'Id object', type: TableCellTypesClassifier.NUMBER, isSortable: true },
    //                     { name: 'id_parent', label: 'Id parent', type: TableCellTypesClassifier.NUMBER, isSortable: true },
    //                     { name: 'code_object', label: 'Code object', type: TableCellTypesClassifier.STRING, isSortable: true },
    //                     { name: 'rank_object', label: 'Rank object', type: TableCellTypesClassifier.NUMBER, isSortable: true },
    //                     { name: 'name_object', label: 'Name object', type: TableCellTypesClassifier.STRING, isSortable: true },
    //                     { name: 'name_short', label: 'Name short', type: TableCellTypesClassifier.STRING, isSortable: true },
    //                     { name: 'note_object', label: 'Note object', type: TableCellTypesClassifier.STRING, isSortable: true },
    //                 ],
    //                 actions:
    //                 [
    //                     { url: 'https://localhost/show/{code_object}', svgId: 'essential-trash', type: TableActionTypesClassifier.ALERT, isConfirm: true },
    //                     // { url: 'https://localhost/show/{id_object}', svgId: 'essential-trash', type: TableActionTypesClassifier.ALERT, isConfirm: true },
    //                 ],
    //             },
    //         inputs:
    //             [
    //                 // { position: TablePositionsClassifier.TOP_RIGHT, inputName: 'query', inputPlaceholder: 'Id Object', }
    //             ]
    //     });
    //
    // table.initialization();
});

// const formData = new FormData();
//
// formData.append('test', '123123');
//
// const data = { id_object: 12, first_name: 'Matthew', last_name: 'Thomas' };