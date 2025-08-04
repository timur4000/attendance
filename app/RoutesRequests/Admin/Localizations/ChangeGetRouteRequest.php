<?php

namespace App\RoutesRequests\Admin\Localizations;

use App\Standards\Classifiers\Admin\AdminConfigClassifier;
use App\Standards\Classifiers\Admin\LocalizationVarClassifier;
use App\Standards\Classifiers\Http\HttpCodesClassifier;
use App\Managers\Admin\AdminConfigManager;
use App\Standards\RouteRequests\Abstracts\RouteRequest;
use Illuminate\Support\Facades\Session;

/**
 * Implements declare change route of localization group.
 */
class ChangeGetRouteRequest extends RouteRequest
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('change');

        $this->add_variable(LocalizationVarClassifier::locale->name);
    }

    /**
     * @inheritdoc
     *
     * @return callable
     */
    protected function callable(): callable
    {
        return function (string $locale)
        {
            $locales = AdminConfigManager::get_option(AdminConfigClassifier::locales);

            if (!in_array($locale, $locales))
            {
                abort(HttpCodesClassifier::NOT_FOUND->value);
            }

            Session::put(LocalizationVarClassifier::locale->name, $locale);

            return redirect()
                ->back();
        };
    }
}
