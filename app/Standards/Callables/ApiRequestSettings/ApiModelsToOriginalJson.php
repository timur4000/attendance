<?php

namespace App\Standards\Callables\ApiRequestSettings;

use App\Standards\Callables\Interfaces\ICallable;
use Illuminate\Support\Collection;
use ReflectionProperty;

/**
 * Implements callable logic for collection properties that need to be converted to json.
 */
class ApiModelsToOriginalJson implements ICallable
{
    /**
     * @param Collection $value
     *
     * @param ReflectionProperty $property
     *
     * @return string
     */
    public function __invoke(Collection $value, ReflectionProperty $property): string
    {
        return $value->map(fn ($record) => $record->to_original())->toJson();
    }
}
