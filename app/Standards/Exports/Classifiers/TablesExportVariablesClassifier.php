<?php

namespace App\Standards\Exports\Classifiers;

/**
 * Contains all possible variable of the table exports.
 */
enum TablesExportVariablesClassifier: string
{
    case TYPE = 'type';

    case COLUMNS = 'columns';
}
