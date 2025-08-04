<?php

namespace App\Standards\ApiRequests\Abstracts;

use App\ApiModels\StandardResponse\StandardResponseApiModel;
use App\Logs\AttendanceApiCustomLog;
use App\Managers\Admin\AdminConfigManager;
use App\Standards\Classifiers\Admin\AdminConfigClassifier;
use App\Standards\Classifiers\Chars\CharsClassifiers;
use App\Standards\Classifiers\Errors\ErrorMessagesClassifier;
use App\Standards\HttpRequests\Abstracts\HttpRequest;

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
        return AdminConfigManager::get_option(AdminConfigClassifier::attendance_api_host) . CharsClassifiers::URL_DELIMITER . parent::get_url();
    }

    /**
     * Checks if the response of request is a standard.
     *
     * @deprecated V3 version of api returns only standard response.
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
     * @return StandardResponseApiModel
     */
    public function get_response(): StandardResponseApiModel
    {
        return new StandardResponseApiModel($this->response);
    }

    /**
     * Returns response without post-processing.
     *
     * @return mixed
     */
    public function get_response_without_post_processing(): mixed
    {
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

            $attributes =
                [
//                    'response' => $this->response,
                    'send_data' => array_merge(request()->all(), request()->json()->all()),
                    'headers' => parent::headers_to_array(),
                    'body' => $this->body_to_json(),
                    'url' => $this->get_url(),
                ];

            $log = new AttendanceApiCustomLog(ErrorMessagesClassifier::REQUEST_SUCCESS->value, $attributes);

            $log->execute();

            if (!$this->is_valid_json)
            {
                throw new \Error(ErrorMessagesClassifier::JSON_INVALID->value);
            }
        }
        catch (\Error $error)
        {
            $log = new AttendanceApiCustomLog($error->getMessage());

            $log->execute();
        }

        return $prepare;
    }
}
