<?php

namespace App\RouteGroups\Admin\Configurations;

use App\RouteGroups\Admin\Configurations\Groups\ConfigurationGroupsRouteGroup;
use App\RouteGroups\Admin\Configurations\Types\ConfigurationTypesRouteGroup;
use App\RouteGroups\Admin\Configurations\Values\ConfigurationValuesRouteGroup;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the configurations.
 */
class ConfigurationsRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('configurations');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call(ConfigurationGroupsRouteGroup::class);

        $this->call(ConfigurationTypesRouteGroup::class);

        $this->call(ConfigurationValuesRouteGroup::class);
    }
}
