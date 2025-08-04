<?php

namespace App\Standards\Exports\Classifiers;

/**
 * Contains all possible types for table exports.
 */
enum TableExportTypesClassifier: int
{
    case ALL_PROPERTIES = 0;

    case DISPLAYED_COLUMNS = 1;

    case ALL_COLUMNS = 2;
}
