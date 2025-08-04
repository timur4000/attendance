<?php

namespace App\Standards\Callables\Directories;


use App\Standards\Interfaces\Directories\IFilterCallable;
use App\Managers\Files\FilesManager;
use RecursiveDirectoryIterator;
use SplFileInfo;

/**
 * Implements callable for directories filter of files.
 */
class DirectoriesFilesFilterCallable implements IFilterCallable
{
	/**
	 * Contains allowed file extensions.
	 *
	 * @var string|array
     */
	private string | array $extensions;

	/**
	 * @param string|array $extensions
	 */
	public function __construct(string | array $extensions)
	{
		$this->extensions = $extensions;
	}

    /**
     * @inheritdoc
     *
     * @param SplFileInfo $current
     *
     * @param string $key
     *
     * @param RecursiveDirectoryIterator $directory_iterator
     *
     * @return bool
     */
    public function __invoke(SplFileInfo $current, string $key, RecursiveDirectoryIterator $directory_iterator): bool
	{
		if ($directory_iterator->hasChildren())
		{
			return true;
		}

		if (!$current->isFile() || !empty($this->extensions) && !FilesManager::is($this->extensions, $current->getFilename()))
		{
			return false;
		}

		return true;
	}
}
