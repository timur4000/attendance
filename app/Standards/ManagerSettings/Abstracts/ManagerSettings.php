<?php

namespace App\Standards\ManagerSettings\Abstracts;

/**
 * Implements abstract logic for all possible Manager settings.
 */
abstract class ManagerSettings
{
    /**
     * @param array $settings
     */
    public function __construct(array $settings = [])
    {
        $this->update($settings);
    }

    /**
     * Updates current instance by the specified properties.
     *
     * @param array $settings
     *
     * @return void
     */
    public function update(array $settings = []): void
    {
        foreach ($settings as $key => $setting)
        {
            if (!property_exists($this, $key))
            {
                continue ;
            }

            $this->{ $key } = $setting;
        }
    }
}
