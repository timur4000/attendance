<?php

namespace App\Handlers\Systems\Env;

use App\Standards\Handlers\Abstracts\Handler;
use App\Standards\Handlers\Interfaces\IRecording;
use App\Standards\Handlers\Interfaces\ISelectable;
use Illuminate\Support\Collection;

/**
 * Implements help work with env information.
 */
class EnvHandler extends Handler implements IRecording, ISelectable
{

    /**
     * @inheritDoc
     */
    public static function records(): Collection
    {
        $collection = new Collection();

        foreach ($_ENV as $key => $value)
        {
            $collection->put($key, $value);
        }

        return $collection;
    }

    /**
     * @inheritdoc
     *
     * @param string $key
     *
     * @param string $value
     *
     * @return Collection
     */
    public static function to_select_options(string $key, string $value): Collection
    {
        return self::records();
    }
}
