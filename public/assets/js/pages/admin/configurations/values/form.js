import { App }                from '../../../../app.js';
import { querySelector }      from '../../../../tea-modules/Functions/DOM/Queries/querySelector.js';
import { CustomSelect }       from '../../../../components/CustomSelect/CustomSelect.js';
import { CustomSelectEventTypesClassifier } from '../../../../components/CustomSelect/CustomSelectEventTypesClassifier.js';
import { CustomNumber } from '../../../../components/CustomNumber/CustomNumber.js';


const app = new App();

/**
 * TODO: Need refactoring
 **/
app.customEvents.subscribe('app:load', () =>
{
    const select_types = CustomSelect.getInstanceBySelect(querySelector('[name=id_configuration_type]'));
    
    const value_integer = CustomNumber.getInstanceByInputElement(querySelector('[name=value_integer]'));
    
    const value_min = CustomNumber.getInstanceByInputElement(querySelector('[name=value_min]'));
    
    const value_max = CustomNumber.getInstanceByInputElement(querySelector('[name=value_max]'));
    
    const value_string = querySelector('[name=value_string]');
    
    const value_boolean_label = querySelector('[for=value_boolean]');
    
    select_types.customEvents.subscribe(CustomSelectEventTypesClassifier.SELECT_ITEM, toggle);
    
    toggle();
    
    function toggle()
    {
        const type = parseInt(select_types.getSelected().value);
        
        [ value_integer, value_min, value_max ].forEach(a => a.domElement.parentElement.classList.toggle('hide', type !== 2));
        
        value_string.closest('.form-group').classList.toggle('hide', type !== 3);
        
        value_boolean_label.closest('.form-group').classList.toggle('hide', type !== 4);
    }
});
