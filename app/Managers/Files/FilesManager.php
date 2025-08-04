<?php

namespace App\Managers\Files;


use App\Managers\String\StringManager;
use App\Standards\Classifiers\Errors\ErrorMessagesClassifier;
use App\Standards\Managers\Abstracts\Manager;
use SplFileInfo;
use stdClass;

/**
 * Implements help work with files.
 */
class FilesManager extends Manager
{
    /**
     * Reads a file by the specified path.
     *
     * If file is not exist - return empty string.
     *
     * @param string $file_path
     *
     * @return string
     * */
    public static function read(string $file_path): string
    {
        if (!is_file($file_path))
        {
            return '';
        }

        return file_get_contents($file_path);
    }

    /**
     * Reads a json file.
     *
     * @param string $file_path
     *
     * @return object|array
     */
    public static function read_json(string $file_path): object | array
    {
        if (!is_file($file_path))
        {
            return new stdClass();
        }

        $json = json_decode(self::read($file_path));

        if (json_last_error() !== JSON_ERROR_NONE)
        {
            throw new \Error(ErrorMessagesClassifier::JSON_INVALID->value);
        }

        return $json;
    }

    /**
     * Checks if a given file name has the specified extension(s).
     *
     * @param string|array $extensions
     *
     * @param string $file_name
     *
     * @return bool
     */
    public static function is(string | array $extensions, string $file_name): bool
    {
        $string = $extensions;

        if (is_array($extensions))
        {
            $string = implode('|', $extensions);
        }

        return preg_match('/\.' . $string . '$/', $file_name);
    }

    /**
     * Returns the sha-512 hash by the specified file path.
     *
     * @param string $file_path
     *
     * @return string
     */
    public static function sha512(string $file_path): string
    {
        $data = self::read($file_path);

        return StringManager::sha512($data);
    }

    /**
     * Returns the real path from the specified file path.
     *
     * @param string $file_path
     *
     * @return string
     */
    public static function real_path(string $file_path): string
    {
        $file_info = new SplFileInfo($file_path);

        return $file_info->getRealPath();
    }
}
