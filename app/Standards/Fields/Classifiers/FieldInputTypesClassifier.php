<?php

namespace App\Standards\Fields\Classifiers;

/**
 * Contains all possible types of input elements.
 */
enum FieldInputTypesClassifier
{
    case text;

    case number;

    case tel;

    case email;

    case checkbox;

    case submit;

    case button;

    case reset;

    case hidden;
}
