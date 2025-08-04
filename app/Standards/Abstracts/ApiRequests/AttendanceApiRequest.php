<?php

namespace App\Standards\Abstracts\ApiRequests;

use App\ApiModels\StandardResponseApiModel;
use App\Logs\AttendanceApiCustomLog;
use App\Standards\Abstracts\HttpRequests\HttpRequest;
use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Classifiers\Errors\ErrorMessagesClassifier;

/**
 * Implements abstract logic for attendance api requests.
 */
abstract class AttendanceApiRequest extends HttpRequest
{
    /**
     * @inheritdoc
     *
     * @return string
     */
    protected function get_url(): string
    {
        return env('ATTENDANCE_API_HOST') . CharsClassifiers::URL_DELIMITER . parent::get_url();
    }

    /**
     * Checks if the response of request is a standard.
     *
     * @return bool
     */
    public function is_standard_response(): bool
    {
        if (array_is_list($this->response))
        {
            return false;
        }

        return true;
    }

    /**
     * Returns api model of standard or just response.
     *
     * @return StandardResponseApiModel|array
     */
    public function get_response(): StandardResponseApiModel | array
    {
        if ($this->is_standard_response())
        {
            return new StandardResponseApiModel($this->response);
        }

        return $this->response;
    }

    /**
     * @inheritdoc
     *
     * @return mixed
     */
    public function execute(): mixed
    {
        $prepare = [];

        try
        {
            $prepare = parent::execute();

            $log = new AttendanceApiCustomLog(ErrorMessagesClassifier::REQUEST_SUCCESS->value, [ 'request' => $this->response ]);

            $log->execute();
        }
        catch (\Error $error)
        {
            $log = new AttendanceApiCustomLog($error);

            $log->execute();
        }

        return $prepare;
    }
}
