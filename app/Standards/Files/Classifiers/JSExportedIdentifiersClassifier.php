<?php

namespace App\Standards\Files\Classifiers;

/**
 * Contains all possible exported identifiers of the JS.
 */
enum JSExportedIdentifiersClassifier: string
{
    case JS_CLASS = 'class';

    case JS_FUNCTION = 'function';

    case JS_CONST = 'const';

    case JS_LET = 'let';

    case JS_VAR = 'var';
}
