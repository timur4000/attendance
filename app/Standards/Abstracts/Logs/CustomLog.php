<?php

namespace App\Standards\Abstracts\Logs;

use App\Standards\Classifiers\Logs\LogFileNamesClassifier;
use App\Standards\Classifiers\Logs\LogLevelsClassifier;
use App\Standards\Managers\Json\JsonManager;
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
}
