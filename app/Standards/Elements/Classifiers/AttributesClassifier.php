<?php

namespace App\Standards\Elements\Classifiers;

/**
 * Contains all possible name attributes of elements.
 */
enum AttributesClassifier: string
{
    case ID = 'id';

    case CLASS_NAME = 'class';

    case STYLE = 'style';

    case ACTION = 'action';

    case METHOD = 'method';

    case NAME = 'name';

    case VALUE = 'value';

    case PLACEHOLDER = 'placeholder';

    case TYPE = 'type';

    case COLS = 'cols';

    case ROWS = 'rows';

    case AUTOCOMPLETE = 'autocomplete';

    case DATA_TIME_INPUT = 'data-time-input';

    case DATA_SELECTED_DATE = 'data-selected-date';

    case DATA_MIN_DATE = 'data-min-date';

    case DATA_MAX_DATE = 'data-max-date';

    case DATA_TIMEPICKER = 'data-timepicker';

    case DATA_AUTO_CLOSE = 'data-auto-close';
}
