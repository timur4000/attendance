<?php

namespace App\Logs;

use App\Standards\Logs\Abstracts\CustomLog;
use App\Standards\Logs\Classifiers\LogFileNamesClassifier;

/**
 * Implements log for the attendance api.
 */
class AttendanceApiCustomLog extends CustomLog
{
    /**
     * @inheritdoc
     *
     * @var LogFileNamesClassifier
     */
    protected LogFileNamesClassifier $file_name = LogFileNamesClassifier::ATTENDANCE_API;

    /**
     * @inheritdoc
     *
     * @return string
     */
    protected function get_message(): string
    {
        if (admin_authorization()->is_authorized())
        {
            $this->data = [ 'user-login' => admin_authorization()->user()->person_name ] + $this->data;
        }

        return parent::get_message();
    }
}
