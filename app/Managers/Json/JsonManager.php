<?php

namespace App\Managers\Json;

use App\Standards\Classifiers\Errors\ErrorMessagesClassifier;
use App\Standards\Managers\Abstracts\Manager;

/**
 * Implements help work with json.
 */
class JsonManager extends Manager
{
    /**
     * Checks if the given string is a json.
     *
     * @param string $string
     *
     * @return bool
     */
    static public function is_json(string $string): bool
    {
        json_decode($string);

        return json_last_error() === JSON_ERROR_NONE;
    }

    /**
     * Returns array or object of the given json.
     *
     * @param string $string
     *
     * @return mixed
     */
    static public function from_json(string $string): mixed
    {
        if (!self::is_json($string))
        {
            throw new \Error(ErrorMessagesClassifier::JSON_INVALID->value);
        }

        return json_decode($string);
    }

    /**
     * Returns json of the given data.
     *
     * @param string $data
     *
     * @return mixed
     */
    static public function to_json(mixed $data): string
    {
        return json_encode($data);
    }
}