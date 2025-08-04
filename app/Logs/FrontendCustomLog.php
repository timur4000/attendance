<?php

namespace App\Logs;

use App\Standards\Logs\Abstracts\CustomLog;
use App\Standards\Logs\Classifiers\LogFileNamesClassifier;

/**
 * Implements log for the frontend.
 */
class FrontendCustomLog extends CustomLog
{
    /**
     * @inheritdoc
     *
     * @var LogFileNamesClassifier
     */
    protected LogFileNamesClassifier $file_name = LogFileNamesClassifier::FRONTEND;
}
