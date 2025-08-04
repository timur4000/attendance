<?php

namespace App\Standards\Classifiers\ApiRequests;

/**
 * Contains all possible types of api classifiers.
 */
enum ApiRequestClassifierTypesClassifier: string
{
    case CLASSIFIER = 'classifier';

    case STATUS = 'status';

    case UNIT = 'unit';

    case POSITION = 'position';

    case FOOD = 'food';

    case INVOICE = 'invoice';

    case CATEGORY = 'category';

    case MEASURE = 'measure';

    case PERSON = 'person';

    case NATIONALITY = 'nationality';

    case GENDER = 'gender';

    case LANGUAGE = 'lang';

    case GATE = 'gate';

    case ROLE = 'role';

    case FILE = 'file';

    case TEXT = 'text';

    case DEVICE = 'device';

    case COUNTRY = 'country';

    case CURRENCY = 'currency';

    case ABSENCE = 'absence';
}
