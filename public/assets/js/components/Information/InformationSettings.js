import { structureMerge } from '../../tea-modules/Functions/Structures/structureMerge.js';
import { InformationTypesClassifier } from './Standards/InformationTypesClassifier.js';
import { InformationThemesClassifier } from './Standards/InformationThemesClassifier.js';
import { InformationSizesClassifier }       from './Standards/InformationSizesClassifier.js';
import { InformationNestedTypesClassifier } from './Standards/InformationNestedTypesClassifier.js';
import { InformationPositionsClassifier }   from './Standards/InformationPositionsClassifier.js';


export class InformationSettings
{
    /**
     * @typedef { Object } InformationSetting
     *
     * @property { Object<InformationNestedTypesClassifier, InformationPositionsClassifier> } [positions]
     *
     * @property { InformationSizesClassifier } [size]
     *
     * @property { InformationThemesClassifier } [theme]
     *
     * @property { InformationTypesClassifier } [type]
     *
     * @property { [ 'size', 'theme', 'type' ] } [modifiers]
     *
     * @property { string } [heading]
     *
     * @property { string } [elementClassName]
     *
     * @property { string } [elementClassName]
     *
     * @property { string } [upperClassName]
     *
     * @property { string } [upperLeftColumnClassName]
     *
     * @property { string } [headingClassName]
     *
     * @property { (1 | 2 | 3 | 4 | 5 | 6) } [headingLevel]
     *
     * @property { string } [lowerClassName]
     *
     * @property { string } [lowerHeaderClassName]
     *
     * @property { string } [lowerBodyClassName]
     *
     * @property { string } [lowerFooterClassName]
     *
     * @property { boolean } [withHeader]
     *
     * @property { boolean } [withFooter]
     *
     * @property { boolean } [withHeading]
     *
     * @property { string } [margins]
     *
     * @property { Array<CustomInputSetting> } [customInputOptions]
     *
     * @property { ToggleButtonsSetting } [toggleButtonSettings]
     *
     * @property { boolean } [withTabs]
     *
     * @property { TabsSetting | TabsSettings } [tabsSettings]
     **/
    
    /**
     * @public
     *
     * @type { Object<InformationNestedTypesClassifier, InformationPositionsClassifier> }
     **/
    positions =
        {
            [ InformationNestedTypesClassifier.HEADING ]: InformationPositionsClassifier.UPPER_LEFT,
            [ InformationNestedTypesClassifier.INPUTS ]: InformationPositionsClassifier.UPPER_RIGHT,
            [ InformationNestedTypesClassifier.TOGGLE_BUTTONS ]: InformationPositionsClassifier.UPPER_LEFT,
            [ InformationNestedTypesClassifier.TABS ]: InformationPositionsClassifier.UPPER_LEFT,
            [ InformationNestedTypesClassifier.TABS_CONTENT ]: InformationPositionsClassifier.LOWER_BODY,
        };
    
    /**
     * @public
     *
     * @type { InformationSizesClassifier }
     **/
    size = InformationSizesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { InformationThemesClassifier }
     **/
    theme = InformationThemesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @type { InformationTypesClassifier }
     **/
    type = InformationTypesClassifier.DEFAULT;
    
    /**
     * @public
     *
     * @readonly
     *
     * @type { [ 'size', 'theme', 'type' ] }
     **/
    modifiers = [ 'size', 'theme', 'type' ];
    
    /**
     * @public
     *
     * @type { string }
     **/
    heading;
    
    /**
     * @public
     *
     * @type { string }
     **/
    elementClassName = 'information';
    
    /**
     * @public
     *
     * @type { string }
     **/
    upperClassName = 'information__upper';
    
    /**
     * @public
     *
     * @type { string }
     **/
    upperLeftColumnClassName = 'information__upper-left-column';
    
    /**
     * @public
     *
     * @type { string }
     **/
    upperRightColumnClassName = 'information__upper-right-column';
    
    /**
     * @public
     *
     * @type { string }
     **/
    headingClassName = 'information__heading';
    
    /**
     * @public
     *
     * @type { string }
     **/
    inputsClassName = 'information__inputs';
    
    /**
     * @public
     *
     * @type { (1 | 2 | 3 | 4 | 5 | 6) }
     **/
    headingLevel = 4;
    
    /**
     * @public
     *
     * @type { string }
     **/
    lowerClassName = 'information__lower';
    
    /**
     * @public
     *
     * @type { string }
     **/
    lowerHeaderClassName = 'information__lower-header';
    
    /**
     * @public
     *
     * @type { string }
     **/
    lowerBodyClassName = 'information__lower-body';
    
    /**
     * @public
     *
     * @type { string }
     **/
    lowerFooterClassName = 'information__lower-footer';
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withHeader = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withFooter = false;
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withHeading = true;
    
    /**
     * @public
     *
     * @type { string }
     **/
    margins = '0';
    
    /**
     * @public
     *
     * @type { Array<CustomInputSetting> }
     **/
    customInputOptions = [];
    
    /**
     * @public
     *
     * @type { ToggleButtonsSetting }
     **/
    toggleButtonSettings = {};
    
    /**
     * @public
     *
     * @type { boolean }
     **/
    withTabs = false;
    
    /**
     * @public
     *
     * @type { TabsSetting | TabsSettings }
     **/
    tabsSettings = { id: 'tabs' };
    
    /**
     * @constructor
     *
     * @param { InformationSetting } settings
     **/
    constructor(settings = {})
    {
        structureMerge(this, settings);
    }
}
