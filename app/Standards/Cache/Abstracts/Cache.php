<?php

namespace App\Standards\Cache\Abstracts;

/**
 * Implements abstract logic for the Cache.
 */
abstract class Cache
{
    /**
     * Contains identifier of the cache.
     *
     * @var string
     */
    protected string $identifier;

    /**
     * Number of seconds to store.
     *
     * @var int
     */
    protected int $seconds = 604800;

    /**
     * Put the given data to the cache.
     *
     * @param mixed $content
     *
     * @return bool
     */
    public function put(mixed $content): bool
    {
        return \Illuminate\Support\Facades\Cache::put($this->identifier, $content, now()->addSeconds($this->seconds));
    }

    /**
     * Checks if cache has the data.
     *
     * @return bool
     */
    public function has(): bool
    {
        return \Illuminate\Support\Facades\Cache::has($this->identifier);
    }

    /**
     * Returns data from the cache.
     *
     * @return bool
     */
    public function get(): mixed
    {
        return \Illuminate\Support\Facades\Cache::get($this->identifier);
    }

    /**
     * Forget data from the cache.
     *
     * @return bool
     */
    public function forget(): bool
    {
        return \Illuminate\Support\Facades\Cache::forget($this->identifier);
    }
}
