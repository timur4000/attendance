<?php

namespace App\Standards\Logs\Classifiers;

/**
 * Contains all possible file names of logs.
 */
enum LogFileNamesClassifier: string
{
    case DEFAULT = 'laravel.log';

    case ATTENDANCE_API = 'attendance-api.log';

    case FRONTEND = 'frontend.log';
}
