<?php

namespace App\ManagerSettings\Directories;

use App\Managers\Directories\DirectoriesManager;
use App\Standards\ManagerSettings\Abstracts\ManagerSettings;
use FilesystemIterator;
use RecursiveIteratorIterator;

/**
 * Contains all possible settings of the 'all' method of the DirectoriesManager class.
 *
 * @see DirectoriesManager::all()
 */
class DirectoriesAllManagerSettings extends ManagerSettings
{
    /**
     * @var string
     */
    public string $directory_path = '';

    /**
     * @var int
     */
    public int $mode = RecursiveIteratorIterator::SELF_FIRST;

    /**
     * @var int
     */
    public int $directory_iterator_default_flags = FilesystemIterator::KEY_AS_PATHNAME | FilesystemIterator::CURRENT_AS_FILEINFO;

    /**
     * @var int
     */
    public int $directory_iterator_extend_flags;

    /**
     * @var int
     */
    public int $recursive_iterator_flags = 0;
}
