<?php

namespace App\RouteGroups\Admin\Classifiers;

use App\RoutesRequests\Admin\Classifiers\Absence\AbsenceDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Absence\AbsenceGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Absence\AbsenceListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Country\CountryDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Country\CountryGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Country\CountryListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Currency\CurrencyDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Currency\CurrencyGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Currency\CurrencyListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Food\FoodDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Food\FoodGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Food\FoodListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Gender\GenderDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Gender\GenderGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Gender\GenderListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Language\LanguageDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Language\LanguageGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Language\LanguageListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Person\PersonDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Person\PersonGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Person\PersonListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Position\PositionDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Position\PositionGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Position\PositionListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Role\RoleDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Role\RoleGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Role\RoleListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Status\StatusDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Status\StatusGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Status\StatusListJsonPostRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Unit\UnitDetailGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Unit\UnitGetRouteRequest;
use App\RoutesRequests\Admin\Classifiers\Unit\UnitListJsonPostRouteRequest;
use App\Standards\RouteGroups\Abstracts\RouteGroup;

/**
 * Implements declare route group for the classifiers.
 */
class ClassifiersRouteGroup extends RouteGroup
{
    public function __construct()
    {
        parent::__construct();

        $this->set_identifier('classifiers');
    }

    /**
     * @inheritdoc
     *
     * @return void
     */
    public function callable(): void
    {
        $this->call_request(UnitGetRouteRequest::class);

        $this->call_request(UnitDetailGetRouteRequest::class);

        $this->call_request(UnitListJsonPostRouteRequest::class);

        $this->call_request(PositionGetRouteRequest::class);

        $this->call_request(PositionDetailGetRouteRequest::class);

        $this->call_request(PositionListJsonPostRouteRequest::class);

        $this->call_request(CurrencyGetRouteRequest::class);

        $this->call_request(CurrencyDetailGetRouteRequest::class);

        $this->call_request(CurrencyListJsonPostRouteRequest::class);

        $this->call_request(FoodGetRouteRequest::class);

        $this->call_request(FoodDetailGetRouteRequest::class);

        $this->call_request(FoodListJsonPostRouteRequest::class);

        $this->call_request(LanguageGetRouteRequest::class);

        $this->call_request(LanguageDetailGetRouteRequest::class);

        $this->call_request(LanguageListJsonPostRouteRequest::class);

        $this->call_request(GenderGetRouteRequest::class);

        $this->call_request(GenderDetailGetRouteRequest::class);

        $this->call_request(GenderListJsonPostRouteRequest::class);

        $this->call_request(PersonGetRouteRequest::class);

        $this->call_request(PersonDetailGetRouteRequest::class);

        $this->call_request(PersonListJsonPostRouteRequest::class);

        $this->call_request(CountryGetRouteRequest::class);

        $this->call_request(CountryDetailGetRouteRequest::class);

        $this->call_request(CountryListJsonPostRouteRequest::class);

        $this->call_request(StatusGetRouteRequest::class);

        $this->call_request(StatusDetailGetRouteRequest::class);

        $this->call_request(StatusListJsonPostRouteRequest::class);

        $this->call_request(AbsenceGetRouteRequest::class);

        $this->call_request(AbsenceDetailGetRouteRequest::class);

        $this->call_request(AbsenceListJsonPostRouteRequest::class);

        $this->call_request(RoleGetRouteRequest::class);

        $this->call_request(RoleDetailGetRouteRequest::class);

        $this->call_request(RoleListJsonPostRouteRequest::class);
    }
}
