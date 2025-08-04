<?php

namespace App\Standards\Classifiers\Errors;

/**
 * Contains all possible error messages.
 */
enum ErrorMessagesClassifier: string
{
    case JSON_INVALID = 'Given JSON is invalid!';

    case REFLECTION_ATTRIBUTE_NOT_DECLARED = 'Attribute for property \'%s\' is not declared!';

    case VALUE_WITH_KEY_NOT_DEFINED = 'Value with given key \'%s\' is not defined!';

    case REQUEST_SUCCESS = 'Request execute success complete!';

    case API_MODEL_TYPE_DIFFERENT = 'The given ApiModel instance type is different!';

    case MISSING_REFLECTION_ATTRIBUTE = 'Reflection attribute for the \'%s\' property is not exist!';
}
