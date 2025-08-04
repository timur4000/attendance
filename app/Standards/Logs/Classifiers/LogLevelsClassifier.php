<?php

namespace App\Standards\Logs\Classifiers;

/**
 * Contains all possible level of logs.
 */
enum LogLevelsClassifier: string
{
    case DEBUG = 'debug';

    case INFO = 'info';

    case ERROR = 'error';
}
