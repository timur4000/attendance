<?php

namespace App\Standards\Managers\Files;


/**
 * Implements help work with files.
 */
class FilesManager
{
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
}
