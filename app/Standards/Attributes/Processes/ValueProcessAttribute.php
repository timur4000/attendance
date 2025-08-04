<?php

namespace App\Standards\Attributes\Processes;

use App\Standards\Callables\Interfaces\ICallable;
use ReflectionProperty;

#[\Attribute]
class ValueProcessAttribute
{
    /**
     * @var ICallable
     */
    public ICallable $namespace;

    /**
     * @param ICallable $namespace
     */
    public function __construct(ICallable $namespace)
    {
        $this->namespace = $namespace;
    }

    /**
     * @param mixed $value
     *
     * @param ReflectionProperty $property
     *
     * @return mixed
     */
    public function process(mixed $value, ReflectionProperty $property): mixed
    {
        return ($this->namespace)($value, $property);
    }
}
