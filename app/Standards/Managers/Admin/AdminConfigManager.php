<?php

namespace App\Standards\Managers\Admin;

use App\Standards\Classifiers\Admin\AdminConfigClassifier;

/**
 * Implements help work with config of admin.
 */
class AdminConfigManager
{
    /**
     * Returns option value of admin config.
     *
     * @param AdminConfigClassifier $admin_config_classifier
     *
     * @return mixed
     */
    static public function get_option(AdminConfigClassifier $admin_config_classifier): mixed
    {
        return config('admin.' . $admin_config_classifier->name);
    }
}
