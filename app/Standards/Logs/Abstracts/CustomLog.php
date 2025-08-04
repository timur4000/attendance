<?php

namespace App\Standards\Logs\Abstracts;

use App\Managers\Admin\AdminConfigManager;
use App\Managers\Directories\DirectoriesManager;
use App\Managers\Json\JsonManager;
use App\Standards\Classifiers\Admin\AdminConfigClassifier;
use App\Standards\Logs\Classifiers\LogFileNamesClassifier;
use App\Standards\Logs\Classifiers\LogLevelsClassifier;
use Illuminate\Support\Facades\Log;

/**
 * Implements abstract logic for all custom logs.
 */
abstract class CustomLog
{
    /**
     * Contains driver for the log config.
     *
     * @var string
     */
    protected string $driver = 'single';

    /**
     * Contains level for the log config.
     *
     * @var LogLevelsClassifier
     */
    protected LogLevelsClassifier $level = LogLevelsClassifier::DEBUG;

    /**
     * Contains path to directory for the log-file.
     *
     * @var string
     */
    protected string $path;

    /**
     * Contains file name for the log file in system.
     *
     * @var LogFileNamesClassifier
     */
    protected LogFileNamesClassifier $file_name = LogFileNamesClassifier::DEFAULT;

    /**
     * Contains message to write in log-file.
     *
     * @var string
     */
    protected string $message;

    /**
     * Contains data to write in log-file.
     *
     * @var array
     */
    protected array $data;

    /**
     * @param string $message
     *
     * @param mixed $data
     */
    public function __construct(string $message = '', array $data = [])
    {
        $this->data = $data;

        $this->message = $message;

        $this->path = storage_path('logs');
    }

    /**
     * Executes log methods.
     *
     * @return void
     */
    public function execute(): void
    {
        self::clear_processing();

        Log
            ::build($this->get_config())
            ->log($this->level->value, $this->get_message());
    }

    /**
     * Returns config array for the build method.
     *
     * @return array
     */
    protected function get_config(): array
    {
        return [
            'driver' => $this->driver,
            'path' => $this->get_path(),
        ];
    }

    /**
     * Returns join string with path and file name.
     *
     * @return string
     */
    protected function get_path(): string
    {
        return $this->path . DIRECTORY_SEPARATOR . $this->file_name->value;
    }

    /**
     * Returns processing message.
     *
     * @return string
     */
    protected function get_message(): string
    {
        $message = $this->message;

        if ($this->data)
        {
            $message .= ' data: ' . JsonManager::to_json($this->data);
        }

        return $message;
    }

    /**
     * Clears log-file.
     *
     * @return void
     */
    public function clear(): void
    {
        exec('echo "" > ' . $this->get_path());
    }

    /**
     * Returns size of file.
     *
     * @return int
     */
    public function size(): int
    {
        return filesize($this->get_path()) ?? 0;
    }

    /**
     * Implements static process of the clear.
     *
     * @todo Need refactoring with cron.
     *
     * @return void
     */
    static public function clear_processing(): void
    {
        $files = DirectoriesManager::get_files(storage_path('logs/'), 'log');

        /**
         * @var $file \SplFileInfo
         */
        foreach ($files as $file)
        {
            if (AdminConfigManager::get_option(AdminConfigClassifier::max_size_log_files) > $file->getSize())
            {
                continue ;
            }

            exec('echo "" > ' . $file->getPathname());
        }
    }
}
