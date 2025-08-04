<?php

namespace App\Managers\Directories;


use App\ManagerSettings\Directories\DirectoriesAllManagerSettings;
use App\Standards\Callables\Directories\DirectoriesFilesFilterCallable;
use App\Standards\Interfaces\Directories\IFilterCallable;
use App\Standards\Managers\Abstracts\Manager;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

/**
 * Implements help work with directories.
 */
class DirectoriesManager extends Manager
{
    /**
     * Recursively returns all items in a directory by the specified settings.
     *
     * @param DirectoriesAllManagerSettings $settings
     *
     * @return RecursiveIteratorIterator
     */
	static public function all(DirectoriesAllManagerSettings $settings): RecursiveIteratorIterator
	{
		$directory_iterator = new RecursiveDirectoryIterator($settings->directory_path, $settings->directory_iterator_default_flags);

        if (isset($settings->directory_iterator_extend_flags))
        {
            $directory_iterator->setFlags($settings->directory_iterator_extend_flags);
        }

		return new RecursiveIteratorIterator($directory_iterator, $settings->mode, $settings->recursive_iterator_flags);
	}

    /**
     * Recursively returns all files with specified extension in a directory.
     *
     * If extensions is empty returns all files.
     *
     * @param string $directory_path
     *
     * @param string|array $extensions
     *
     * @return RecursiveIteratorIterator
     */
	static public function get_files(string $directory_path, string | array $extensions = ''): RecursiveIteratorIterator
	{
		return self::get_by_filter($directory_path, new DirectoriesFilesFilterCallable($extensions));
	}

    /**
     * Recursively reading directory by filter of callable.
     *
     * @param string $directory_path
     *
     * @param IFilterCallable $filter_callable
     *
     * @param int $mode
     *
     * @return RecursiveIteratorIterator
     */
    static public function get_by_filter(string $directory_path, IFilterCallable $filter_callable, int $mode = RecursiveIteratorIterator::SELF_FIRST): RecursiveIteratorIterator
	{
		$directory_iterator = new RecursiveDirectoryIterator($directory_path);
		
		$files = new \RecursiveCallbackFilterIterator($directory_iterator, $filter_callable);
		
		return new RecursiveIteratorIterator($files, $mode);
	}
}